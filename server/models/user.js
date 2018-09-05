const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    default: ''
  },
  dbs: {
    type: Array,
    default: []
  },
})

const User = mongoose.model('user', userSchema)

module.exports = User
