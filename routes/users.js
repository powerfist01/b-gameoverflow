module.exports = function (express, passport) {
    const userController = require('../controllers/users');
    const router = express.Router();

    // Register
    router.post('/register', userController.register);

    router.post('/login', userController.login);

    // router.get('/get_all_users', passport.authenticate('jwt', { session: false }), userController.getAllUsers)

    router.get('/logout', passport.authenticate('jwt', { session: false }), userController.logout);

    router.get('/confirmation', userController.verifyToken);
    // router.post('/resend-toen', userController.resendTokenPost);

    return router;
}