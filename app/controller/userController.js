const { SECRETKEY, BUCKETNAME } = require("../../config");
const sessionModel = require("../models/session");
const {
  createSession,
  findOneSession,
  deleteOneToken,
} = require("../services/sessionService");
const {
  findOneUser,
  createUser,
  findOneUserAndUpdate,
} = require("../services/userService");
const MESSAGES = require("../utils/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const userController = {};

userController.signUp = async (req, res) => {
  const payload = req.body;
  if (await findOneUser({ email: payload.email, isDeleted: false })) {
    return res.json({ message: MESSAGES.EMAIL_EXIST });
  }
  const file = req.file;
  if (!file) {
    res.json({ message: MESSAGES.FILE_NOT_UPLOADED });
  }
  const fileName = file.originalname;
  const params = {
    Bucket: "rajat777",
    Key: fileName,
    Body: file.buffer,
  };

  await s3.upload(params, {}, async (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ message: err.message });
    }
    payload.profileImage = data.Location;
    console.log(payload);
    payload.password = await bcrypt.hash(payload.password, 8);
    const user = await createUser(payload);
    const token = jwt.sign({ _id: user._id }, SECRETKEY);
    const session = {
      token: token,
      userId: user._id,
    };
    await createSession(session);
    return res.json({
      token: token,
      id: user._id,
      imageUrl: payload.profileImage,
    });
  });
};

userController.login = async (req, res) => {
  const payload = req.body;
  const user = await findOneUser({ email: payload.email });
  const password = await bcrypt.compare(payload.password, user.password);
  delete user.password;
  if (user && password) {
    const token = await sessionModel.findOne(
      { userId: user._id },
      { token: 1, _id: 0 }
    );
    return res.json({ token: token, user: user });
  }
  return res.json({ message: MESSAGES.INVALID_CREDENTIALS });
};

userController.showProfile = async (req, res) => {
  const payload = req.user;
  const imageUrl = {
    name: payload.name,
    url: payload.profileImage,
  };
  return res.json({ message: imageUrl });
};

userController.deleteProfile = async (req, res) => {
  const payload = req.user;
  const user = await findOneUserAndUpdate(
    { _id: payload._id, isDeleted: false },
    { $set: { isDeleted: true } }
  );
  const session = await deleteOneToken({ token: payload.token });
  res.json({ message: MESSAGES.ACCOUNT_DELETED });
};

userController.updateProfile = async (req, res) => {
  const payload = req.user;
  const file = req.file;
  if (file) {
    const fileName = file.originalname;
    const params = {
      Bucket: "rajat777",
      Body: file.buffer,
      Key: fileName,
    };
    console.log(params);
    s3.upload(params, {}, async (err, data) => {
      if (err) {
        return res.json({ message: err.message });
      }
      payload.profileImage = data.Location;
      await findOneUserAndUpdate({ _id: payload._id }, payload);
      return res.json({ message: MESSAGES.PROFILE_UPDATED_SUCCESSFULLY });
    });
  } else {
    console.log(payload);
    await findOneUserAndUpdate({ _id: payload._id }, { $set: req.body });
    return res.json({ message: MESSAGES.PROFILE_UPDATED_SUCCESSFULLY });
  }
};

userController.changePassword = async (req, res) => {
  const payload = req.user;
  const password = await bcrypt.compare(
    req.body.presentPassword,
    payload.password
  );
  if (password) {
    await findOneUserAndUpdate(
      { _id: payload._id },
      { $set: { password: await bcrypt.hash(req.body.changePassword, 8) } }
    );
    return res.json({ message: MESSAGES.PASSWORD_CHANGED_SUCCESSFULLY });
  }
  return res.json({ message: MESSAGES.PLEASE_ENTER_A_VALID_PASSWORD });
};

userController.showImage = async (req, res) => {
  console.log(req.user);
  res.set("content-type", "image/png");
  res.send(req.user.profileImage);
};

module.exports = userController;
