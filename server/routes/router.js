const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const exampleData = {
  users: [
    {
      id: "1",
      role: "admin",
      nickname: "admin_user",
      password: "admin_pass",
      profileImage: "admin_image.jpg",
      posts: [
        {
          id: "1",
          title: "First post",
          content: "This is the content of the first post.",
          date: "2024-04-20",
        },
        {
          id: "2",
          title: "Second post",
          content: "This is the content of the second post.",
          date: "2024-04-19",
        },
      ],
      comments: [
        {
          id: "1",
          postId: "1",
          content: "This is a comment on the first post.",
          date: "2024-04-20",
        },
      ],
      messages: [
        {
          id: "1",
          senderId: "2",
          content: "Hello admin!",
          date: "2024-04-20",
        },
      ],
    },
    {
      id: "2",
      role: "user",
      nickname: "regular_user",
      password: "user_pass",
      profileImage: "user_image.jpg",
      posts: [
        {
          id: "3",
          title: "My first post",
          content: "This is my first post.",
          date: "2024-04-18",
        },
      ],
      comments: [
        {
          id: "2",
          postId: "3",
          content: "Nice post!",
          date: "2024-04-18",
        },
      ],
      messages: [
        {
          id: "2",
          senderId: "1",
          content: "Hello!",
          date: "2024-04-20",
        },
      ],
    },
    {
      id: "3",
      role: "user",
      nickname: "another_user",
      password: "another_pass",
      profileImage: "another_image.jpg",
      posts: [],
      comments: [],
      messages: [],
    },
  ],
};

const memories = {
  memories: [
    {
      id: "Snvhx0ER12523",
      uploadDate: "2023-03-15",
      author: "A2s15GQa1",
      image: "./images/memories/example__memory-1.jpg",
      title: "Sunny Flight to Honduras",
      description: "",
      category: "",
      tags: [],
      amountOfLikes: 0,
      comments: [],
      isSuspended: false,
    },
    {
      id: "dsand2345sad45AasdfF",
      uploadDate: "2023-12-15",
      author: "A2sdsaFGZXCGQa1",
      image: "./images/memories/example__memory-2.jpg",
      title: "Strength of Mountains",
      description: "",
      category: "",
      tags: [],
      amountOfLikes: 0,
      comments: [],
      isSuspended: false,
    },
    {
      id: "DXzxED21923",
      uploadDate: "2024-01-25",
      author: "A2s15asdGQa1",
      image: "./images/memories/example__memory-3.jpg",
      title: "Beauty of Kaunas",
      description: "",
      category: "",
      tags: [],
      amountOfLikes: 0,
      comments: [],
      isSuspended: false,
    },
    {
      id: "VxnbahsS1246+",
      uploadDate: "2024-03-15",
      author: "A2s15GQa1",
      image: "./images/memories/example__memory-4.jpg",
      title: "Sunset glory",
      description: "",
      category: "",
      tags: [],
      amountOfLikes: 0,
      comments: [],
      isSuspended: false,
    },
    {
      id: "AsnkjkjcxhzASD3145",
      uploadDate: "2024-01-05",
      author: "asdSDVGsadnlkdjhsa",
      image: "./images/memories/example__memory-5.jpg",
      title: "Gorgeous Malta",
      description: "",
      category: "",
      tags: [],
      amountOfLikes: 0,
      comments: [],
      isSuspended: false,
    },
    {
      id: "safnjkXVZasbfjldas",
      uploadDate: "2023-03-15",
      author: "sadCXVhkwsadh",
      image: "./images/memories/example__memory-6.jpg",
      title: "Cold Mountains",
      description: "",
      category: "",
      tags: [],
      amountOfLikes: 0,
      comments: [],
      isSuspended: false,
    },
  ],
};

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

module.exports = router;
