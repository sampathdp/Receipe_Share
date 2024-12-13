const express = require('express');
const mysql = require('mysql2');
const db = require('./db');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Save files in 'uploads' folder inside 'public'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create unique file names
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'recipe-sharing-secret',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * FROM recipes ORDER BY created_at DESC LIMIT 5', (err, results) => {
            if (err) {
                console.error('Database query failed:', err);
                return res.render('home', { recipes: [] });
            }
            console.log('Fetched recipes:', results); // Debug: Log the recipes data
            res.render('home', { recipes: results });
        });
    } else {
        res.redirect('/login'); // Redirect to login if not logged in
    }
});

// Signup Route
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle Signup Form Submission
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            // Username already exists
            return res.render('signup', { errorMessage: 'Username already exists' });
        } else {
            // Proceed with registration
            const hashedPassword = await bcrypt.hash(password, 10);

            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
                if (err) {
                    console.error(err);
                    return res.redirect('/signup');
                }
                res.redirect('/login');
            });
        }
    });
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists in DB
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare password with bcrypt
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.redirect('/login');
                }

                if (isMatch) {
                    req.session.userId = user.id; // Store user ID in session
                    return res.redirect('/'); // Redirect to the home page
                } else {
                    // Invalid password
                    return res.render('login', { errorMessage: 'Invalid username or password.' });
                }
            });
        } else {
            // User not found
            return res.render('login', { errorMessage: 'Invalid username or password.' });
        }
    });
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/');
    });
});

// Add Recipe Page
app.get('/add-recipe', (req, res) => {
    if (req.session.userId) {
        res.render('add-recipe');
    } else {
        res.redirect('/login');
    }
});

// Handle Add Recipe Form Submission
app.post('/add-recipe', upload.single('image'), (req, res) => {
    const { title, description, ingredients, instructions } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : null; // Save image path

    // Insert the recipe into the database
    db.query('INSERT INTO recipes (title, description, ingredients, instructions, image) VALUES (?, ?, ?, ?, ?)',
        [title, description, ingredients, instructions, image], (err, results) => {
            if (err) {
                console.error(err);
                res.redirect('/add-recipe');
            } else {
                res.redirect('/view-recipes');
            }
        });
});

// View Recipes Page
app.get('/view-recipes', (req, res) => {
    if (req.session.userId) {
        db.query('SELECT * FROM recipes ORDER BY created_at DESC', (err, results) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                res.render('view-recipes', { recipes: results });
            }
        });
    } else {
        res.redirect('/login');
    }
});

// Recipe Details Route
app.get('/recipe/:id', (req, res) => {
    const recipeId = req.params.id;

    db.query('SELECT * FROM recipes WHERE id = ?', [recipeId], (err, results) => {
        if (err) {
            console.error(err);
            return res.redirect('/view-recipes');
        }
        if (results.length > 0) {
            const recipe = results[0];
            res.render('recipe-detail', { recipe });
        } else {
            res.redirect('/view-recipes');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

