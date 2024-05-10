const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const argon2 = require("argon2");

const { ObjectId } = require("mongodb");
const schemas = require("../models/schemas");

// #region === Memories ===
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

router.post("/newMemory", async (req, res) => {
  const { title, description, userId, tags, category, image } = req.body;

  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const randomId = uuidv4();
  const imageName = `${randomId}.png`;

  const imagePath = path.join(
    __dirname,
    "../../public/images/memories",
    imageName
  );

  try {
    fs.writeFileSync(imagePath, buffer);

    const postData = {
      author: userId,
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
// #endregion ================

// #region === User Management ===
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

router.post("/register", async (req, res) => {
  const users = schemas.Users;
  const { username, password } = req.body;

  try {
    const existingUsers = await users.find({ nickname: username });
    if (existingUsers.length > 0) {
      res.status(400).json({ error: "Username already taken" });
    } else {
      const hashedPassword = await argon2.hash(password);
      const newUserData = {
        role: "USER",
        nickname: username,
        password: hashedPassword,
      };
      console.log(newUserData);

      const newUser = new schemas.Users(newUserData);
      const savedUserData = await newUser.save();

      if (savedUserData) {
        console.log("New user was registered successfully!");
        res.status(200).json({
          message: "New user was registered successfully!",
          newUser: {
            userId: savedUserData._id,
            role: savedUserData.role,
            nickname: savedUserData.nickname,
            img: savedUserData.profileImage,
            isSuspended: savedUserData.isSuspended,
          },
        });
      } else {
        res.status(500).json({ error: "Failed to register new user" });
      }
    }
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).json({ error: "Failed to save comment." });
  }
});

router.post("/login", async (req, res) => {
  const users = schemas.Users;
  const { username, password } = req.body;

  try {
    const user = await users.findOne({ nickname: username });
    if (user === null) {
      res.status(400).json({ error: "User not found" });
    } else if (await argon2.verify(user.password, password)) {
      console.log("Login data correct");
      res.status(200).json({
        message: `${user.nickname} logged in successfully!`,
        userData: {
          userId: user._id,
          role: user.role,
          nickname: user.nickname,
          img: user.profileImage,
          isSuspended: user.isSuspended,
          isBlocked: user.isBlocked,
        },
      });
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ error: "Failed to loggin." });
  }
});

router.put("/newProfilePic", async (req, res) => {
  const { userId, image, probOfDeepFake } = req.body;

  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const randomId = uuidv4();
  const imageName = `${randomId}.png`;

  const imagePath = path.join(
    __dirname,
    "../../public/images/users",
    imageName
  );

  try {
    fs.writeFileSync(imagePath, buffer);

    let putData = {};
    if (probOfDeepFake >= 0.75) {
      putData = {
        profileImage: "default__profile.png",
        suspendedProfileImage: imageName,
        isBlocked: true,
        $inc: { amountOfSuspiciousActivity: 1 },
      };
    } else if (probOfDeepFake >= 0.5) {
      putData = {
        profileImage: "default__profile.png",
        suspendedProfileImage: imageName,
        isSuspended: true,
        $inc: { amountOfSuspiciousActivity: 1 },
      };
    } else {
      putData = {
        profileImage: imageName,
      };
    }

    const users = schemas.Users;
    const filter = { _id: userId };

    let updatedUser = await users.findOneAndUpdate(filter, putData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const amountOfSuspiciousActivity = updatedUser.amountOfSuspiciousActivity;
    updatedUser = {
      newProfilePic: updatedUser.profileImage,
      suspendedImage: updatedUser.suspendedProfileImage,
    };

    if (amountOfSuspiciousActivity >= 3) {
      await users.findOneAndUpdate(filter, { isBlocked: true });
      return res.status(200).json({
        message:
          "Suspicious content detected. Based on your previous activity, this profile will be blocked till our administrators review your content",
        status: "BLOCKED",
        user: updatedUser,
      });
    }

    if (probOfDeepFake >= 0.75) {
      return res.status(200).json({
        message:
          "Deepfake content detected. Due to suspicious activity, this profile was blocked and will be reviewed by our administrators",
        status: "BLOCKED",
        user: updatedUser,
      });
    } else if (probOfDeepFake >= 0.5) {
      return res.status(200).json({
        message:
          "Pottential Deepfake image detected. Your new profile image will be reviewed by our team. Till then, your account will be suspended",
        status: "SUSPENDED",
        user: updatedUser,
      });
    } else {
      return res.status(200).json({
        message: "Profile picture updated successfully!",
        status: "SAFE",
        user: updatedUser,
      });
    }
  } catch (error) {
    console.error("Error saving new profile image:", error);
    res.status(500).json({ error: "Failed to save image." });
  }
});
// #endregion ================

// #region === Comments ===
router.get("/comments/:userId", async (req, res) => {
  try {
    const comments = schemas.Comments;
    const memories = schemas.Memories;

    const userComments = await comments
      .find({ author: req.params.userId })
      .exec();

    if (userComments.length > 0) {
      const responseData = await Promise.all(
        userComments.map(async (comment) => {
          const { _id, post, text, isSuspended } = comment;
          const memory = await memories.findById(post);

          if (memory) {
            return {
              id: _id,
              postId: post,
              postImage: memory.image,
              postTitle: memory.title,
              comment: text,
              status: isSuspended,
            };
          } else {
            return {
              postId: post,
              comment: text,
              status: isSuspended,
              error: "Memory details not found",
            };
          }
        })
      );

      res.json({ comments: responseData });
    } else {
      res.status(404).json({ error: "User hasn't posted any comments" });
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/newComment", async (req, res) => {
  console.log("Received a request to create new comment");
  const { postId, author, text } = req.body;

  try {
    const commentData = {
      author: author,
      post: postId,
      text: text,
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
// #endregion ================

module.exports = router;
