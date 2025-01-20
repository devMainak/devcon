const mongoose = require("mongoose");
const User = require("../models/user.model");

// Function to get all users
const readAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await readAllUsers();
    if (users.length > 0) {
      res
        .status(200)
        .json({ message: "Users fetched successfully.", users: users });
    } else {
      res.status(404).json({ message: "No user found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Function to seed new user in DB
const saveNewUser = async (user) => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const savedUser = await saveNewUser(newUser);
    if (savedUser) {
      res
        .status(201)
        .json({ message: "User added successfully.", savedUser: savedUser });
    } else {
      res.status(400).json({ message: "Failed to add user." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save user." });
  }
};

// Function to follow a user in the database
const updateUserBeingFollowed = async ({ followedId, userId }) => {
  try {
    const followedObjectId = new mongoose.Types.ObjectId(followedId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const existingUser = await User.findById(userObjectId);
    const existingFollowedUser = await User.findById(followedObjectId);

    if (!existingUser) {
      console.warn("User not found for userId:", userId);
      return { message: "User not found" };
    }
    if (!existingFollowedUser) {
      console.warn("Followed user not found for followedId:", followedId);
      return { message: "Followed user not found" };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userObjectId,
      { $addToSet: { following: followedObjectId } },
      { new: true }
    );

    const updatedFollowedUser = await User.findByIdAndUpdate(
      followedObjectId,
      { $addToSet: { followers: userObjectId } },
      { new: true }
    );

    if (!updatedFollowedUser) {
      console.warn("Update failed for followed user's followers:", followedId);
      return { updatedUser, message: "Followed user update failed" };
    }

    console.log("Updated followed user's followers:", updatedFollowedUser);

    return { updatedUser, updatedFollowedUser };
  } catch (error) {
    console.error("Error in updating following/followers:", error);
    throw new Error(error);
  }
};

exports.followUser = async (req, res) => {
  const followedId = req.params.followedId;
  const { userId } = req.body;
  try {
    const { updatedUser, updatedFollowedUser } = await updateUserBeingFollowed({
      followedId,
      userId,
    });
    if (updatedUser && updatedFollowedUser) {
      res.status(200).json({
        message: `Followed ${updatedFollowedUser.name}.`,
        updatedUser: updatedUser,
        updatedFollowedUser,
      });
    } else {
      res
        .status(400)
        .json({ message: "Failed to complete the follow request." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to complete the follow request." });
  }
};

// Function to unfollow user in DB
const updateUserBeingUnfollowed = async ({ unfollowedId, userId }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowedId } },
      { new: true }
    );

    const updatedUnfollowedUser = await User.findByIdAndUpdate(
      unfollowedId,
      { $pull: { followers: userId } },
      { new: true }
    );

    return { updatedUser, updatedUnfollowedUser };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

exports.unfollowUser = async (req, res) => {
  const unfollowedId = req.params.unfollowedId;
  const { userId } = req.body;
  try {
    const { updatedUser, updatedUnfollowedUser } =
      await updateUserBeingUnfollowed({ unfollowedId, userId });
    if (updatedUser && updatedUnfollowedUser) {
      res.status(200).json({
        message: `Unfollowed ${updatedUnfollowedUser.name}.`,
        updatedUser: updatedUser,
        updatedUnfollowedUser,
      });
    } else {
      res
        .status(400)
        .json({ message: "Failed to complete the unfollow request." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to complete the unfollow request." });
  }
};

// Function to update user details
const updateUserDetails = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    res.status(500).json({ error: "Failed to update user details." });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { updatedData } = req.body;

  try {
    const updatedUser = await updateUserDetails(userId, updatedData);

    if (updatedUser) {
      res.status(200).json({ message: "Updated user details", updatedUser });
    } else {
      res.status(400).json({ message: "Failed to update user details" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user details." });
  }
};
