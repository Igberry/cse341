const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate GitHub authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        console.log("GitHub Authentication Successful!");
        console.log("Authenticated User:", req.user);
        res.redirect('/auth/user'); // Redirect to user info page
    }
);

// Logout route (clears session completely)
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

// Route to get current authenticated user
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Send user data
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

module.exports = router;
