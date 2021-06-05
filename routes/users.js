const users = require('../services/users');

module.exports = function (express) {
    const userService = require('../services/users');
    const router = express.Router();
    const passport = require('passport');
    
    // Register
    router.post('/register', userService.register);

    router.post('/login', userService.login);

    router.get('/get_all_users', passport.authenticate('jwt', { session: false }), userService.getAllUsers)

    router.get('/logout', passport.authenticate('jwt', { session: false }), userService.logout);

    return router;
}