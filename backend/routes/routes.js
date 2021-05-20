const router = require("express").Router();
const multer = require("multer");

const eventController = require("../controllers/eventController");
const userController = require("../controllers/userController");
const authenticateMiddleware = require("../middleware/authentication");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

// Events
router
  .route("/event")
  .post(authenticateMiddleware.checkUserRole, authenticateMiddleware.authenticate, eventController.createEvent)
  .get(eventController.getAllEvents);

// user
router.route("/user/signUp").post(userController.signUp);
router.route("/user/signIn").post(userController.signIn);
router
  .route("/user/logOut")
  .post(authenticateMiddleware.authenticate, userController.logOut);

module.exports = router;
