module.exports = function (express, passport) {
    const userController = require('./userController');
    const router = express.Router();

    // Register
    router.post('/register', userController.register);

    router.post('/login', userController.login);

    router.get('/get-all-users', passport.authenticate('jwt', { session: false }), userController.getAllUsers)

    router.get('/logout', passport.authenticate('jwt', { session: false }), userController.logout);

    router.get('/confirmation', userController.verifyToken);
    router.post('/resend-token', userController.resendTokenEmailVerification);

    router.post('/check-if-username-exists', userController.checkIfUsernameExists);
    return router;
}