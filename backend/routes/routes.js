const router = require('express').Router();
const multer = require('multer')

const tweetController = require('../controllers/tweetController')
const userController = require('../controllers/userController')
const authenticateMiddleware = require('../middleware/authenticate')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage
})

// Events
router.route('/event')
  .post(authenticateMiddleware.authenticate, tweetController.createTweet)
  .get(tweetController.getTweets)
router.route('/tweet/like')
  .post(tweetController.likeTweet)
router.route('/myTweets')
  .get(authenticateMiddleware.authenticate, tweetController.getMyTweets)


// user
router.route('/user/signUp').post(userController.signUp)
router.route('/user/signIn').post(userController.signIn)
router.route('/user/currentUser').get(authenticateMiddleware.authenticate, userController.currentUser)
router.route('/user/logOut').post(authenticateMiddleware.authenticate, userController.logOut)
router.route('/user/getAllUsers').get(userController.getAllUsers)
router.route('/user/updateUserInfo').post(authenticateMiddleware.authenticate, upload.single('avatar'), userController.updateUserInfo)





module.exports = router
