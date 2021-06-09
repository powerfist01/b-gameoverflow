module.exports = function (express) {
    const userController = require('../controllers/users');
    const router = express.Router();
    const passport = require('passport');

    // Register
    router.post('/register', userController.register);

    router.post('/login', userController.login);

    // router.get('/get_all_users', passport.authenticate('jwt', { session: false }), userController.getAllUsers)

    router.get('/logout', passport.authenticate('jwt', { session: false }), userController.logout);

    return router;
}