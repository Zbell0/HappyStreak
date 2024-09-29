const express = require('express');
const router = express.Router();
const app = express();

// Import challengeRoute
const challengeRoute = require('./challengesRoute');
const userChallengeRoute = require('./userChallengeRoute');
const contactRoute = require('./contactRoute')

// Import profileRoute
const profileRoute = require('./profileRoute');


// Route for rendering the landing page using EJS
router.get('/', (req, res) => {
    res.render('index'); // render 'index.ejs' in 'views' folder
});

// About route
router.get('/about', (req, res) => {
    res.render('about');
});

// Contact route
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

// Register route
router.get('/register', (req, res) => {
    res.render('register');
});

// Forgot password route
router.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword');
});

// Profile route
router.get('/profile', (req, res) => {
    res.render('profile');
});

router.use('/userChallenges', userChallengeRoute);

// Use challengeRoute for the '/challenges' path
router.use('/challenges', challengeRoute);

// Use profileRoute for the 'profile' path
router.use('/', profileRoute);

router.use('/contact', contactRoute);

module.exports = router;
