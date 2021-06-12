const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

var UserAddress = new Schema({
    city: String,
    state: String,
    country: String
});

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullname: {
        type: String
    },
    phone: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    backupEmail: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address: UserAddress,
    location: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = async function (password, cb) {
    try {
        let isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (err) {
        console.log('Error occured in comparing password')
        return false;
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;