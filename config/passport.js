
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: '613658840979-vlgba1s1g94h38vbe2q2r3ovh8t2169e.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:5000/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, done) {

            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) {
                    console.log("user is there");
                    done(null, user);
                } else {
                    const newUser = {   
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value
                    };
                    user = await User.create(newUser);
                    console.log("creating new user");
                    done(null, user);
                }
            } catch (err) {
                console.error(err);
            }

        }
    ));



    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}











