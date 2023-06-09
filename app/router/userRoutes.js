const express = require("express");
const validateJoiSchema = require("../middleware/validateJoiSchema");
const signUpSchema = require("../validate/signUpSchema");
const {
  signUp,
  login,
  showProfile,
  deleteProfile,
  updateProfile,
  changePassword,
  showData,
} = require("../controller/userController");
const loginSchema = require("../validate/loginSchema");
const showProfileSchema = require("../validate/showProfileSchema");
const router = express.Router();
const passport = require("passport");
const deleteSchema = require("../validate/deleteSchema");
const updateSchema = require("../validate/updateSchema");
const changePasswordSchema = require("../validate/changepasswordSchema");
require("../middleware/passport")(passport);

const multer = require("multer");

const storage = multer.memoryStorage(); // Store the uploaded file in memory

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit the file size to 5MB (adjust as needed)
  },
});


router.post(
  "/signup",
  upload.single("upload"),
  validateJoiSchema(signUpSchema),
  signUp
);

router.post("/login", validateJoiSchema(loginSchema), login);

router.get(
  "/showprofile",
  validateJoiSchema(showProfileSchema),
  passport.authenticate("jwt", { session: false }),
  showProfile
);

router.delete(
  "/delete",
  validateJoiSchema(deleteSchema),
  passport.authenticate("jwt", { session: false }),
  deleteProfile
);

router.put(
  "/updateProfile",
  upload.single("upload"),
  validateJoiSchema(updateSchema),
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

router.patch(
  "/changePassword",
  validateJoiSchema(changePasswordSchema),
  passport.authenticate("jwt", { session: false }),
  changePassword
);

router.get(
  "/showData",
  showData
);


module.exports = router;
