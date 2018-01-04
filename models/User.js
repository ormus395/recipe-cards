const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
  email: {
    required: true,
    unique: true,
    validate: {
      validator:validator.isEmail,
      message: '{VALUE} is not a valid email.'
    },
    type: String,
  },
  username: {
    required: true,
    unique: true,
    type: String  
  },
  password: {
    required: true,
    type: String,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});