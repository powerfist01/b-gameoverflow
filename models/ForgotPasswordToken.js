const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgotPasswordSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  }
});

const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema);

module.exports = ForgotPassword;
