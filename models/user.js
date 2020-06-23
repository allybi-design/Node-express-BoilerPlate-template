const mongoose = require("mongoose")
const bCrypt = require("bcryptjs");
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre("save", function (next) { //NB MUST be function to access 'this'
  const user = this

  bCrypt.genSalt(10, (err, salt) => {
    if (err) { return err }

    bCrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return console.error(err) }

      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {

  bCrypt.compare(candidatePassword, this.password).then((res, err) => {
    if (err) return callback(err)

    callback(null, res);
  });
}


const ModelClass = mongoose.model("user", userSchema)

module.exports = ModelClass