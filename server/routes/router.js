const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

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

router.get("/users", (req, res) => {
  res.send(exampleData);
});

router.get("/memories", (req, res) => {
  res.send(memories);
});

router.post("/newMemory", async (req, res) => {
  const { title, description, tags, category, image } = req.body;

  const postData = {
    author: "User123",
    image: "URL",
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
  }

  res.end();
});

module.exports = router;
