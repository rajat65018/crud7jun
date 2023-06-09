const { SECRETKEY } = require("../../config");
const sessionModel = require("../models/session");
const { createSession, deleteOneToken } = require("../services/sessionService");
const {
  findOneUser,
  createUser,
  findOneUserAndUpdate,
  findUser,
} = require("../services/userService");
const fs = require("fs");
const path = require("path");
const MESSAGES = require("../utils/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadFileToS3 = require("../helper/index");

const userController = {};

userController.signUp = async (req, res) => {
  const payload = req.body;
  if (await findOneUser({ email: payload.email, isDeleted: false })) {
    return res.json({ message: MESSAGES.EMAIL_EXIST });
  }
  const file = req.file;
  if (!file) {
    return res.json({ message: MESSAGES.PROFILE_IMAGE_NOT_ADDED });
  }
  try {
    const profileImage = await uploadFileToS3(req);
    payload.profileImage = profileImage;
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
  } catch (err) {
    console.error(err);
    return res.json({ message: err.message });
  }
};

userController.login = async (req, res) => {
  const payload = req.body;
  console.log(req.body);
  console.log(payload);
  const user = await findOneUser({ email: payload.email, isDeleted: false });
  if (!user) {
    return res.json({
      message: MESSAGES.INVALID_CREDENTIALS,
    });
  }
  const password = await bcrypt.compare(payload.password, user.password);
  if (!password) {
    return res.json({ message: MESSAGES.INVALID_CREDENTIALS });
  }
  const token = await sessionModel.findOne(
    {
      userId: user._id,
    },
    { token: 1, _id: 0 }
  );
  return res.json({ token: token, user: user });
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
  await findOneUserAndUpdate(
    { _id: payload._id, isDeleted: false },
    { $set: { isDeleted: true } }
  );
  await deleteOneToken({ token: payload.token });
  res.json({ message: MESSAGES.ACCOUNT_DELETED });
};

userController.updateProfile = async (req, res) => {
  const payload = req.user;
  const file = req.file;
  if (file) {
    try {
      const profileImage = await uploadFileToS3(req);
      payload.profileImage = profileImage;
      await findOneUserAndUpdate({ _id: payload._id }, payload);
      return res.json({ message: MESSAGES.PROFILE_UPDATED_SUCCESSFULLY });
    } catch (err) {
      return res.json({ message: err.message });
    }
  } else {
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

userController.showData = async (req, res) => {
  const user =await findUser({},{password:0});
  res.render("hello", {
    stooges: user,
  });
};

module.exports = userController;
