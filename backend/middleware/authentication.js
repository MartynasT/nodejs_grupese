const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Session = require("../models/sessionModel");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers["eventauth"];
    let decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    let session = await Session.findOne({ sessionToken: token });

    if (!session) throw "error";

    let user = await User.findOne({ _id: decoded.id });
    if (!user) throw "error";

    req.user = user;
    req.sessionToken = session;
    next();
  } catch (e) {
    res.status(401).send({
      message: "you are not authorized",
    });
  }
};

module.exports = { authenticate };
