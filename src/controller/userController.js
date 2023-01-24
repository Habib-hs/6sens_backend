const User = require("../model/userModel");
const { createError } = require("../utlis/error.js");

exports.createUser = async (req, res, next) => {
  const fullname = req.body.firstName + " " + req.body.lastName;

  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: fullname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
    await newUser.save();
    res.status(200).json({
      message: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers, users });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (req.body.email && req.body.email !== user.email) {
      return res.status(400).json({ message: "You cannot change the email." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

exports.blockUser = async (req, res, next) => {
  console.log("block user is called");
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: "User has been blocked" });
  } catch (err) {
    next(err);
  }
};

exports.unblockUser = async (req, res, next) => {
  // console.log('unblocked is called')
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    user.isBlocked = false;
    await user.save();
    res.status(200).json({ message: "User has been unblocked" });
  } catch (err) {
    next(err);
  }
};
