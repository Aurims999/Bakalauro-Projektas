const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default: "default__profile.png",
  },
  suspendedProfileImage: {
    type: String,
    default: "default__profile.png",
  },
  messages: [
    {
      banner: { type: String, default: "default__banner.png" },
      date: { type: Date, default: Date.now, required: true },
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  amountOfSuspiciousActivity: { type: Number, default: 0, required: true },
  isSuspended: { type: Boolean, default: false, required: true },
  isBlocked: { type: Boolean, default: false, required: true },
});

const memorySchema = new Schema({
  uploadDate: { type: Date, default: Date.now, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "" },
  tags: { type: Array, default: [] },
  isSuspended: { type: Boolean, required: true },
});

const commentSchema = new Schema({
  uploadDate: { type: Date, default: Date.now, required: true },
  author: { type: String, required: true },
  post: { type: String, required: true },
  text: { type: String, required: true },
  category: { type: String },
  isSuspended: { type: Boolean, required: true },
});

const Users = mongoose.model("Users", userSchema, "users");
const Memories = mongoose.model("Memories", memorySchema, "memories");
const Comments = mongoose.model("Comments", commentSchema, "comments");
const mySchemas = {
  Users: Users,
  Memories: Memories,
  Comments: Comments,
};

module.exports = mySchemas;
