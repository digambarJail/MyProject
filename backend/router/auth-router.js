const express = require("express");

const app = express()

const router = express.Router();
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validate = require('../middlewares/validate-middleware');
const signupSchema = require("../validators/auth-validator");

router
    .route("/posts").get(authMiddleware, authController.posts);

router
    .route("/register")
    .post(validate(signupSchema),authController.register);

module.exports = router;