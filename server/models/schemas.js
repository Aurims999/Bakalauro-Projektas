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
  posts: { type: Array },
  comments: { type: Array },
  messages: { type: Array },
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
  comments: { type: Array, default: [] },
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

const messageSchema = new Schema({
  createDate: { type: Date, default: Date.now, required: true },
  post: { type: String, required: true },
  text: { type: String, required: true },
  messageType: { type: String, required: true },
  isRead: { type: Boolean, required: true },
});

const Users = mongoose.model("Users", userSchema, "users");
const Memories = mongoose.model("Memories", memorySchema, "memories");
const Comments = mongoose.model("Comments", commentSchema, "comments");
const Messages = mongoose.model("Messages", messageSchema, "messages");
const mySchemas = {
  Users: Users,
  Memories: Memories,
  Comments: Comments,
  Messages: Messages,
};

module.exports = mySchemas;
