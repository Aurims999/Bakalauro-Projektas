const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true },
  role: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  posts: { type: Array },
  comments: { type: Array },
  messages: { type: Array },
  isSuspended: { type: Boolean, required: true },
});

const memorySchema = new Schema({
  id: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  tags: { type: Array },
  amountOfLikes: { type: Number, default: 0 },
  comments: { type: Array },
  isSuspended: { type: Boolean, required: true },
});

const commentSchema = new Schema({
  id: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  category: { type: String },
  isSuspended: { type: Boolean, required: true },
});

const messageSchema = new Schema({
  id: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
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
