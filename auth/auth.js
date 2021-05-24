const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use('register', new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.create({ email, password });

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
)
);

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            console.log('Error is geting here')
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }

            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }
)
);