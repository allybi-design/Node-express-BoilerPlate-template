const User = require("../models/user")
const jwt = require("jwt-simple")
const config = require("../config")

const userToken = (user) => {
  return jwt.encode({ sub: user._id, iat: new Date().getTime() }, config.secret)
}

exports.signUp = (req, res, next) => {

  User.findOne({ email: req.body.email }, (err, emailExisting) => {
    if (err) return next(err)

    if (emailExisting) {
      return res.status(422).send({ error: "Email is in Use" })
    }

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    })

    newUser
      .save()
      .then(data => {
        res.status(200).send({ token: userToken(newUser) });
      })
      .catch(err => {
        res.status(404).send(`Not saved ERROR:${err}`);
      });
  });
}

exports.signIn = (req, res, next) => {
  res.status(200).send({token: userToken(req.user)})
}