const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    default: "ABCXYZ",
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
    default:
      'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg',
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
