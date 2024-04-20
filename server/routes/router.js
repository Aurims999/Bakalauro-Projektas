const express = require("express");
const router = express.Router();

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

router.get("/users", (req, res) => {
  res.send(exampleData);
});

module.exports = router;
