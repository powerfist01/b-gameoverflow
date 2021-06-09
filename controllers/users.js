const UserService = require('../services/users');

module.exports = {
    register: async (req, res, next) => {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).send({ success: false, msg: 'Please provide valid !' })
        }
        let userService = new UserService();
        let createdUser = await userService.registerNewUser(username, email, password);
        if (createdUser.success) {
            return res.json({ success: true, msg: 'New User created!' })
        } else {
            return res.status(400).json({ success: false, msg: 'User already exists.' })
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        let userService = new UserService();
        let loggedIn = await userService.loginUser(email, password);
        if (loggedIn.success) {
            return res.json({ success: true, token: 'JTW ' + loggedIn.token })
        } else {
            return res.status(401).send({ success: false, msg: loggedIn.result });
        }
    },

    getAllUsers: async (req, res, next) => {
        
        try {
            let userService = new UserService();
            let data = await userService.getAllUsers();
            return res.json(data);
        } catch (err) {
            return res.status(400).send({ success: false, msg: 'Error occured!' });
        }
    },

    logout: async (req, res) => {

        try {
            req.logout();
            return res.json({ success: true, msg: 'Sign out successfully.' });
        } catch (err) {
            return res.json({ success: false, msg: 'Error in logging out.' });
        }
    }
}