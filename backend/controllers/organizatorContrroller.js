const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Org = require("../models/organizatorModel");
const Session = require("../models/sessionModel");

const signUp = async (req, res) => {
  try {
    const org = new Org({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    let newOrg = await org.save();
    res.send(newOrg);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const getAllOrgs = async (req, res) => {
  const allOrgs = await Org.find();
  res.send(allOrgs);
};

const signIn = async (req, res) => {
  try {
    let org = await Org.findOne({ email: req.body.email });
    if (!org) throw { message: "Wrong email" };

    let passwordMatch = bcrypt.compareSync(req.body.password, org.password);
    if (!passwordMatch) throw { message: "Wrong password" };

    let token = jwt.sign(
      {
        id: org._id,
        role: "organizator",
      },
      process.env.JWT_PASSWORD
    );

    let session = new Session({
      sessionToken: token,
      expires: new Date().setMonth(new Date().getMonth() + 1),
    });

    await session.save();

    res.header("eventauth", token).send(org);
  } catch (e) {
    res.status(400).send(e);
  }
};

const currentOrg = (req, res) => {
  res.send(req.org);
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

const updateOrgInfo = async (req, res) => {
  let org = req.org;
  if (req.file) {
    org.profileImage = req.file.path;
    await org.save();
  }
  res.send(org);
};

module.exports = {
  signUp,
  signIn,
  currentOrg,
  logOut,
  getAllOrgs,
  updateOrgInfo,
};
