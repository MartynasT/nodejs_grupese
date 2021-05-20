const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Session = require("../models/sessionModel");

const signUp = async (req, res) => {
  console.log(req.body);
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      organization: req.body.organization,
    });

    let newUser = await user.save();
    res.send(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const signIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw { message: "Wrong email" };

    let passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch) throw { message: "Wrong password" };

    let token = jwt.sign(
      {
        id: user._id,
        role: req.body.role,
      },
      process.env.JWT_PASSWORD
    );

    let session = new Session({
      sessionToken: token,
      expires: new Date().setMonth(new Date().getMonth() + 1),
    });

    await session.save();

    res.header("eventauth", token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const logOut = async (req, res) => {
  try {
    let token = req.sessionToken;
    await token.remove();
    res.send({
      message: "Success",
    });
  } catch (e) {
    res.status(400).send({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  logOut,
};
