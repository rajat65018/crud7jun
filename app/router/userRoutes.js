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
  showImage,
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

// const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   cb(null, '/tmp/my-uploads')
//   // },
//   filename: function (req, file, cb) {
//     console.log("file name");
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

router.get(
  "/showimage",
  passport.authenticate("jwt", { session: false }),
  showImage
);

router.post(
  "/signup",
  upload.single("upload"),
  (req, res, next) => {
    console.log("===>", req.file.buffer);
    // res.json('hello');
    next();
  },
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

module.exports = router;
