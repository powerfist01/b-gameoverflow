const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserAddress = new Schema({
    city: String,
    state: String,
    country: String
});

const UserProgress = new Schema({
    ratings: Array,
    playList: Array
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
    isVerified: {
        type: Boolean,
        default: false
    },
    address: UserAddress,
    progress: UserProgress,
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
        let isMatch = bcrypt.compare(password, this.password);
        return isMatch;
    } catch (err) {
        return false;
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;