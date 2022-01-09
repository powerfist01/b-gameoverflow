const UserService = require('./userService');

module.exports = {
    register: async (req, res, next) => {
        const { username, email, password } = req.body;
        
        if (!username || !password || !email) {
            return res.status(400).send({ success: false, data: 'Please provide valid inputs!' })
        }
        let userService = new UserService();
        let createdUser = await userService.registerNewUser(username, email, password);

        if (createdUser.success) {
            return res.json({ success: true, data: 'New User created!' })
        } else {
            return res.status(400).json({ success: false, data: 'User already exists.' })
        }
    },

    isUsernameValid: (username) => {
        if(username.length > 3){
            return true;
        }
        return false;
    },

    checkIfUsernameExists: async(req, res, next) => {
        const { username } = req.body;
        let userService = new UserService();
        let exists = await userService.checkIfUsernameExists(username);
        return res.json({ success: true, data: exists });
    },

    login: async (req, res, next) => {
        const { email, password } = req.body;
        let userService = new UserService();
        let loggedIn = await userService.loginUser(email, password);
        if (loggedIn.success)
            return res.json({ success: true, token: loggedIn.token })
        else
            return res.status(401).send({ success: false, data: loggedIn.result });
    },

    getAllUsers: async (req, res, next) => {

        try {
            let userService = new UserService();
            let data = await userService.getAllUsers();
            return res.json(data);
        } catch (err) {
            return res.status(500).send({ success: false, data: 'Server Error!' });
        }
    },

    verifyToken: async (req, res, next) => {
        try {
            const { token } = req.query;
            if (!token)
                return res.status(400).send({ success: false, data: 'Please provide valid token and user id!' })
            let userService = new UserService();
            let verifiedToken = await userService.verifyEmailUserToken(token);
            if (verifiedToken.success)
                return res.json({ success: true, data: verifiedToken.result })
            else
                return res.status(400).send({ success: false, data: verifiedToken.result })
        } catch (err) {
            return res.status(500).send({ success: false, data: 'Server Error!' });
        }
    },

    resendTokenEmailVerification: async (req, res, next) => {
        try {
            const { email } = req.body;

            let userService = new UserService();
            let resendToken = await userService.sendTokenForEmailVerification(email);

            if (resendToken.success)
                return res.json({ success: true, data: resendToken.result })
            else
                return res.status(400).send({ success: false, data: resendToken.result })
        } catch (err) {
            console.log(err);
            return res.status(500).send({ success: false, data: 'Server Error!' });
        }
    },

    logout: async (req, res) => {

        try {
            req.logout();
            return res.json({ success: true, data: 'Sign out successfully.' });
        } catch (err) {
            return res.json({ success: false, data: 'Error in logging out.' });
        }
    }
}