const router = require("express").Router();
const verifyToken = require("../middleware/VerifyToken.js");

const {
  signUp,
  login,
  verify,
} = require("../controllers/auth.controllers.js");

router
  .post("/signup", signUp)
  .post("/login", login)
  .get("/verify", verifyToken, verify);

module.exports = router;