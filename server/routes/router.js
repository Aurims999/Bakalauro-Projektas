const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const { ObjectId } = require("mongodb");
const schemas = require("../models/schemas");

router.get("/memories", async (req, res) => {
  try {
    const memories = schemas.Memories;

    const allMemories = await memories.find({}).exec();
    if (allMemories) {
      res.json({ memories: allMemories });
    } else {
      res.status(404).json({ error: "No memories found" });
    }
  } catch (error) {
    console.error("Error fetching memories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/memories/:userId", async (req, res) => {
  try {
    const memories = schemas.Memories;

    const userMemories = await memories
      .find({ author: req.params.userId })
      .exec();
    if (userMemories) {
      res.json({ memories: userMemories });
    } else {
      res.status(404).json({ error: "No memories found" });
    }
  } catch (error) {
    console.error("Error fetching memories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/memory/:id", async (req, res) => {
  const memories = schemas.Memories;
  const users = schemas.Users;
  const comments = schemas.Comments;

  try {
    const selectedMemory = await memories.findById(req.params.id);
    const selectedUser = await users.findById(selectedMemory.author);
    const memoryComments = await comments.find({ post: selectedMemory._id });

    if (selectedMemory) {
      const response = {
        image: selectedMemory.image,
        title: selectedMemory.title,
        profilePic: selectedUser.profileImage,
        username: selectedUser.nickname,
        description: selectedMemory.description,
        category: selectedMemory.category,
        tags: selectedMemory.tags,
        likes: selectedMemory.amountOfLikes,
        comments: memoryComments,
        suspended: selectedMemory.isSuspended,
      };
      res.json(response);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error retrieving user's data: ", error);
    res.status(500).json({ error: "Server error occured" });
  }
});

router.get("/user/:id", async (req, res) => {
  const users = schemas.Users;

  try {
    const selectedUser = await users.findById(req.params.id);

    if (selectedUser) {
      const response = {
        nickname: selectedUser.nickname,
        image: selectedUser.profileImage,
      };
      res.json(response);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error retrieving user's data: ", error);
    res.status(500).json({ error: "Server error occured" });
  }
});

router.post("/newMemory", async (req, res) => {
  const { title, description, tags, category, image } = req.body;

  //Decoding the image that was imported
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  //Generating an ID for the image (which will be use for image naming in local storage)
  const randomId = uuidv4();
  const imageName = `${randomId}.png`;

  const imagePath = path.join(
    __dirname,
    "../../public/images/memories",
    imageName
  );

  try {
    //Saving image to local storage
    fs.writeFileSync(imagePath, buffer);

    // New post's data
    const postData = {
      author: "6627cd702a16495ae9260b8c",
      image: imageName,
      title: title,
      description: description,
      category: category,
      tags: tags,
      comments: [],
      isSuspended: false,
    };

    const newPost = new schemas.Memories(postData);
    const savePost = await newPost.save();

    if (savePost) {
      res.json({ message: "New post was added successfully!" });
    } else {
      res.status(500).json({ error: "Failed to save post." });
    }
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ error: "Failed to save image." });
  }
});

router.post("/newComment", async (req, res) => {
  console.log("Received a request to create new comment");
  const { postId, authorId, commentText } = req.body;

  try {
    const commentData = {
      author: authorId,
      post: postId,
      text: commentText,
      category: "Positive",
      isSuspended: false,
    };
    console.log(commentData);

    const newComment = new schemas.Comments(commentData);
    const saveComment = await newComment.save();

    if (saveComment) {
      console.log("Comment was added successfully!");
      res.json({ message: "Comment was added successfully!" });
    } else {
      res.status(500).json({ error: "Failed to add comment." });
    }
  } catch (error) {
    console.error("Error saving memory:", error);
    res.status(500).json({ error: "Failed to save comment." });
  }
});

module.exports = router;
