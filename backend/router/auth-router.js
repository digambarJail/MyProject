// Routing implemented

const express = require("express");
const router = express.Router();
const { posts, register, upload } = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validate = require('../middlewares/validate-middleware');
const signupSchema = require("../validators/auth-validator");

router
    .route("/posts")
    .get(authMiddleware, posts);

router
    .route("/register")
    .post(upload.single('prof_pic'), validate(signupSchema), register);

module.exports = router;