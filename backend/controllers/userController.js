import User from "../models/userModel.js";
import bcrypt from "bcrypt";
// controllers/user.controller.js
export const updateAvatar = async (req, res, next) => {
  try {
    // 1. Check if user is authenticated (req.user comes from your middleware)
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // 2. Update the user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          avatar: req.body.avatar,
        },
      },
      { new: true } // returns the updated document
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    // 3. Remove password from response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    // 4. Send the error to your error-handling middleware
    next(error);
  }
};
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          ...(req.body.password && {
            password: await bcrypt.hash(req.body.password, 10),
          }),
        },
      },
      { new: true }
    );

    const { password, ...safeUser } = updatedUser._doc;
    res.status(200).json(safeUser); // 🔥 RETURN FULL USER
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};
export const deleteAccount = async (req, res, next) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // 1. Check if user is authenticated
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    // 2. Delete the user from MongoDB
    await User.findByIdAndDelete(req.user.id);
    // 3. Send success response
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    // 4. Send the error to your error-handling middleware
    next(error);
  }
};
