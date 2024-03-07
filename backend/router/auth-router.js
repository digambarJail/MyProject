const express = require("express");

const app = express()

const router = express.Router();
const authController = require("../controllers/auth-controller");
const validate = require('../middlewares/validate-middleware');
const signupSchema = require("../validators/auth-validator");

router.route("/").get(authController.home);

router
    .route("/register")
    .post(validate(signupSchema),authController.register);

router.route("/login").post(authController.login);

// router.route("/").get((req,res) => {
//     res.status(200).send("Worked using router");

// })

// router.route("/register").get((req,res) => {
//     res.status(200).send("Registration page!");
// })

module.exports = router;