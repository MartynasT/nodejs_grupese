const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Session = require("../models/sessionModel");

const signUp = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    let newUser = await user.save();
    res.send(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
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
        role: "user",
      },
      process.env.JWT_PASSWORD
    );

    let session = new Session({
      sessionToken: token,
      expires: new Date().setMonth(new Date().getMonth() + 1),
    });

    await session.save();

    res.header("twitterauth", token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const currentUser = (req, res) => {
  res.send(req.user);
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

const updateUserInfo = async (req, res) => {
  let user = req.user;
  if (req.file) {
    user.profileImage = req.file.path;
    await user.save();
  }
  res.send(user);
};

module.exports = {
  signUp,
  signIn,
  currentUser,
  logOut,
  getAllUsers,
  updateUserInfo,
};
