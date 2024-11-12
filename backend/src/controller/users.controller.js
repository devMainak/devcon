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

// Function to follow user in DB
const updateUserBeingFollowed = async ({ userId, followedId }) => {
  try {
    const user = await User.findById(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      following: [...user.followers, followedId],
    });
    // Updating followed users follower list
    const followedUser = await User.findById(followedId);
    const updatedFollowedUser = await User.findByIdAndUpdate(followedId, {
      followers: [...followedUser.followers, userId],
    });
    return { updatedUser, updatedFollowedUser };
  } catch (error) {
    throw new Error(error);
  }
};

exports.followUser = async (req, res) => {
  const followedId = req.params.userId;
  const { userId } = req.body;
  try {
    const { updatedUser, updatedFollowedUser } = await updateUserBeingFollowed({
      userId,
      followedId,
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
const updateUserBeingUnfollowed = async ({ userId, unfollowedId }) => {
  try {
    const user = await User.findById(userId);
    const updatedFollowingList = user.following.filter(
      (user) => user._id !== unfollowedId
    );
    const updatedUser = await User.findByIdAndUpdate(userId, {
      following: updatedFollowingList,
    });
    // Updating unfollowed users follower list
    const unfollowedUser = await User.findById(unfollowedId);
    const updatedFollowersList = unfollowedUser.filter(
      (user) => user._id !== userId
    );
    const updatedUnfollowedUser = await User.findByIdAndUpdate(unfollowedId, {
      followers: updatedFollowersList,
    });
    return { updatedUser, updatedUnfollowedUser };
  } catch (error) {
    throw new Error(error);
  }
};

exports.unfollowUser = async (req, res) => {
  const unfollowedId = req.params.userId;
  const { userId } = req.body;
  try {
    const { updatedUser, updatedUnfollowedUser } =
      await updateUserBeingUnfollowed({ userId, unfollowedId });
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
