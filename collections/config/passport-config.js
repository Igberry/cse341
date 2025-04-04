const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const Client = require('../models/client'); // Using the Client model
require('dotenv').config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://cse341-30rh.onrender.com/auth/github/callback",
    scope: ['user:email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let client = await Client.findOne({ githubId: profile.id });

            if (!client) {
                client = new Client({
                    githubId: profile.id,
                    username: profile.username,
                    email: profile.emails?.length ? profile.emails[0].value : `no-email-${profile.id}@example.com`,
                    avatar: profile.photos[0]?.value || '',
                    firstName: profile.displayName?.split(" ")[0] || "",
                    lastName: profile.displayName?.split(" ")[1] || "",
                });
                await client.save();
            }

            return done(null, client);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((client, done) => {
    done(null, client.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const client = await Client.findById(id);
        done(null, client);
    } catch (err) {
        done(err, null);
    }
});

// Export function that takes `app` as an argument
module.exports = (app) => {
    // Homepage route - Only show first and last name
    app.get('/', (req, res) => {
        console.log("Session User on Homepage:", req.session.user);  // Debugging Log

        if (req.session.user) {
            const fullName = `${req.session.user.firstName} ${req.session.user.lastName}`.trim();
            res.send(`Logged in as ${fullName}`);
        } else {
            res.send("Logged Out");
        }
    });

    // GitHub OAuth Callback
    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/api/docs',
        session: true
    }), (req, res) => {
        req.session.user = {
            firstName: req.user.firstName || '',
            lastName: req.user.lastName || ''
        };

        console.log("Session User After Login:", req.session.user);  // Debugging Log
        console.log("req.user:", req.user);  // Debugging Log

        res.redirect('/');
    });
};
