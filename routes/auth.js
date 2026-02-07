import express from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

// GET /register - Show registration form
router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('register', {
        currentYear: new Date().getFullYear(),
        error: null
    });
});

// POST /register - Create new user
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return res.render('register', {
                currentYear: new Date().getFullYear(),
                error: 'All fields are required'
            });
        }

        if (password !== confirmPassword) {
            return res.render('register', {
                currentYear: new Date().getFullYear(),
                error: 'Passwords do not match'
            });
        }

        if (password.length < 6) {
            return res.render('register', {
                currentYear: new Date().getFullYear(),
                error: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.render('register', {
                currentYear: new Date().getFullYear(),
                error: 'Username or email already exists'
            });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Log in the user
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.render('register', {
                    currentYear: new Date().getFullYear(),
                    error: 'Registration successful but login failed. Please try logging in.'
                });
            }
            res.redirect('/');
        });
    } catch (error) {
        console.error(error);
        res.render('register', {
            currentYear: new Date().getFullYear(),
            error: 'An error occurred during registration'
        });
    }
});

// GET /login - Show login form
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login', {
        currentYear: new Date().getFullYear(),
        error: null
    });
});

// POST /login - Authenticate user
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.render('login', {
                currentYear: new Date().getFullYear(),
                error: info.message || 'Invalid email or password'
            });
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            const returnTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            res.redirect(returnTo);
        });
    })(req, res, next);
});

// GET /logout - End session
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

export default router;
