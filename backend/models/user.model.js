import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;