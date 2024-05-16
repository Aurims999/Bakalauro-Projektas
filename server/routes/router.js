const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const argon2 = require("argon2");

const { ObjectId } = require("mongodb");
const schemas = require("../models/schemas");
const { error } = require("console");

const sendMessage = async (
  userId,
  message,
  messageTitle,
  banner = "default__banner.png"
) => {
  const users = schemas.Users;

  try {
    const selectedUser = await users.findById(userId);
    if (!selectedUser) {
      return false;
    }

    const newMessage = {
      banner: banner,
      date: new Date(),
      title: messageTitle,
      text: message,
    };

    await selectedUser.messages.push(newMessage);
    await selectedUser.save();
    return true;
  } catch (error) {
    console.log("Server error: ", error);
    return false;
  }
};

// #region === Memories ===
router.get("/allmemories", async (req, res) => {
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

router.delete("/deleteMemory/:memoryId", async (req, res) => {
  const memories = schemas.Memories;
  const comments = schemas.Comments;

  try {
    const selectedMemory = await memories.findById(req.params.memoryId);
    if (!selectedMemory) {
      res.status(404).json({ error: "Memory not found" });
    }

    await comments.deleteMany({ post: selectedMemory._id });
    console.log("Comments from memory removed successfully");
    await selectedMemory.deleteOne();
    console.log("Memory removed successfully");
    fs.unlinkSync(`../public/images/memories/${selectedMemory.image}`);
    console.log(`Deleted ${selectedMemory.image} from local storage`);
    res.status(204).send();
  } catch (error) {
    console.log("Error retrieving data: ", error);
    res.status(500).json({ error: "Server error occured" });
  }
});
// #endregion ================

// #region === User Management ===
router.get("/users", async (req, res) => {
  const users = schemas.Users;

  try {
    const allUsers = await users
      .find()
      .sort({ amountOfSuspiciousActivity: -1 });

    const responseData = allUsers.map((user) => {
      return {
        id: user._id,
        role: user.role,
        nickname: user.nickname,
        profileImage: user.profileImage,
        amountOfSuspiciousActivity: user.amountOfSuspiciousActivity,
        isSuspended: user.isSuspended,
        isBlocked: user.isBlocked,
      };
    });

    res.status(200).json({
      message: "A list of users successfully returned",
      users: responseData,
    });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ error: "Server error" });
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

router.get("/userDetailed/:id", async (req, res) => {
  const users = schemas.Users;
  const memories = schemas.Memories;
  const comments = schemas.Comments;

  try {
    const selectedUser = await users.findById(req.params.id);
    if (!selectedUser) {
      res.status(404).json({ error: "User not found" });
    }

    const userMemories = await memories.find({ author: selectedUser._id });
    let userComments = await comments.find({ author: selectedUser._id });

    if (userComments.length > 0) {
      userComments = await Promise.all(
        userComments.map(async (comment) => {
          const post = await memories.findById(comment.post);
          return {
            comment: comment.text,
            status: comment.isSuspended,
            postId: post._id,
            postImage: post.image,
            postTitle: post.title,
          };
        })
      );
    }

    const responseData = {
      userId: selectedUser._id,
      nickname: selectedUser.nickname,
      profileImage: selectedUser.profileImage,
      posts: userMemories,
      comments: userComments,
      amountOfActivity: selectedUser.amountOfSuspiciousActivity,
      suspended: selectedUser.isSuspended,
      blocked: selectedUser.isBlocked,
    };

    res.status(200).json({
      message: "Successfully retrieved detailed info about user",
      userData: responseData,
    });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({
      error: "Server error while retrieving detailed info about user",
    });
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
        sendMessage(
          savedUserData._id,
          `Welcome ${savedUserData.nickname}. We're glad to have you join our community at Trip Share! Explore exciting trips, share your travel experiences, and connect with fellow travelers. We hope you have an amazing journey with us!`,
          "Welcome to Trip Share!"
        );
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
      if (user.isBlocked || user.amountOfSuspiciousActivity >= 3) {
        res.status(403).json({
          message: `This account is blocked and requires administrator approval for access. Contact customer service for more details`,
        });
      } else {
        res.status(200).json({
          message: `${user.nickname} logged in successfully!`,
          userData: {
            userId: user._id,
            role: user.role,
            nickname: user.nickname,
            img: user.profileImage,
            isSuspended: user.isSuspended,
          },
        });
      }
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ error: "Failed to loggin." });
  }
});

router.put("/newProfilePic", async (req, res) => {
  const { userId, image, currentProfilePic, probOfDeepFake } = req.body;

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
    if (currentProfilePic != "default__profile.png") {
      const currentImagePath = path.join(
        __dirname,
        "../../public/images/users",
        currentProfilePic
      );

      try {
        fs.unlinkSync(currentImagePath);
        console.log(`Deleted ${currentProfilePic}`);
      } catch (error) {
        console.error(`Error deleting ${currentProfilePic}:`, error);
      }
    }

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
      sendMessage(
        userId,
        "Potential Deepfake image detected. Your new profile image will be reviewed by our team. Till then, your account will be suspended",
        "Profile Suspension"
      );
      return res.status(200).json({
        message:
          "Potential Deepfake image detected. Your new profile image will be reviewed by our team. Till then, your account will be suspended",
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

router.get("/messages/:userId", async (req, res) => {
  const users = schemas.Users;
  try {
    const selectedUser = await users.findById(req.params.userId);
    if (!selectedUser) {
      res.status(404).json({ error: "User not found" });
    }

    const sortedMessages = selectedUser.messages.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json({
      message: "Successfully retrieved a list of user's messages",
      messages: sortedMessages,
    });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});
// #endregion ================

// #region === Comments ===
router.get("/comments/:userId", async (req, res) => {
  try {
    const comments = schemas.Comments;
    const memories = schemas.Memories;

    const userComments = await comments.find({ author: req.params.userId });

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
      res.json({ comments: [] });
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

router.delete("/deleteComment/:commentId", async (req, res) => {
  const comments = schemas.Comments;

  try {
    const selectedComment = await comments.findById(req.params.commentId);
    if (!selectedComment) {
      res.status(404).json({ error: "Memory not found" });
    }

    await comments.deleteOne({ post: selectedComment._id });
    console.log("Comment from memory removed successfully");
    await selectedComment.deleteOne();
    res.status(204).send();
  } catch (error) {
    console.log("Error retrieving data: ", error);
    res.status(500).json({ error: "Server error occured" });
  }
});
// #endregion ================

// #region === Admin ===
const changeSuspicioutActivityCounter = async (userId, suspended) => {
  const users = schemas.Users;
  const postAuthor = await users.findById(userId);

  let suspiciousActivity = postAuthor.amountOfSuspiciousActivity;
  postAuthor.amountOfSuspiciousActivity = suspended
    ? suspiciousActivity + 1
    : postAuthor.amountOfSuspiciousActivity > 0
    ? suspiciousActivity - 1
    : 0;

  if (postAuthor.amountOfSuspiciousActivity === 2 && suspended) {
    sendMessage(
      userId,
      "Warning: We're noticing some suspicious activity from your account. We remind you that users are not allowed to post fake content or make aggressive or vulgar comments under user memories. If more suspicious activities are detected by the system, your account will be permanently banned.",
      "Suspicious Activity"
    );
  }

  if (
    postAuthor.amountOfSuspiciousActivity >= 3 &&
    postAuthor.isBlocked === false
  ) {
    postAuthor.isBlocked = true;
  } else if (
    postAuthor.amountOfSuspiciousActivity < 3 &&
    postAuthor.isBlocked
  ) {
    postAuthor.isBlocked = false;
  }
  await postAuthor.save();
};

router.get("/suspendedMemories", async (req, res) => {
  const memories = schemas.Memories;

  try {
    const suspendedMemories = await memories.find({ isSuspended: true }).exec();
    res.status(200).json({
      message: "A list of all suspended memories",
      memories: suspendedMemories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Server Error. Unable to retrieve a list of all suspended memories",
    });
  }
});

router.put("/suspendMemory/:memoryId", async (req, res) => {
  try {
    const memories = schemas.Memories;
    const users = schemas.Users;

    const selectedMemory = await memories.findById(req.params.memoryId);
    if (!selectedMemory) {
      res.status(404).json({ error: "Memory not found" });
    }

    selectedMemory.isSuspended = !selectedMemory.isSuspended;
    await selectedMemory.save();

    changeSuspicioutActivityCounter(
      selectedMemory.author,
      selectedMemory.isSuspended
    );

    sendMessage(
      selectedMemory.author,
      `Your memory "${selectedMemory.title}" was suspended. Our team will review your memory and decide if it meets our Community Guidelines. In any case, you'll be informed about our decision.`,
      "Memory Suspension",
      selectedMemory.image
    );
    res.status(200).json({
      message: "Memory suspension status changed successfully",
      suspended: selectedMemory.isSuspended,
    });
  } catch (error) {
    console.log("Memory processing error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/suspendedComments", async (req, res) => {
  const comments = schemas.Comments;
  const memories = schemas.Memories;

  try {
    const suspendedComments = await comments.find({ isSuspended: true }).exec();
    if (suspendedComments.length > 0) {
      const responseData = await Promise.all(
        suspendedComments.map(async (comment) => {
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
      res.status(200).json({ comments: responseData });
    } else {
      res.status(200).json({ comments: [] });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/suspendComment/:commentId", async (req, res) => {
  try {
    const comments = schemas.Comments;
    const users = schemas.Users;
    const memories = schemas.Memories;

    const selectedComment = await comments.findById(req.params.commentId);
    if (!selectedComment) {
      res.status(404).json({ error: "Comment not found" });
    }

    selectedComment.isSuspended = !selectedComment.isSuspended;
    await selectedComment.save();

    changeSuspicioutActivityCounter(
      selectedComment.author,
      selectedComment.isSuspended
    );

    const memory = await memories.findById(selectedComment.post);

    sendMessage(
      selectedComment.author,
      `One of your under memory "${memory.title}" was suspended. Our team will review your comment and decide if this comment meets our Community Guidelines. In any case, you'll be informed about our decision.`,
      "Comment Suspension",
      memory.image
    );

    res.status(200).json({
      message: "Comment suspension status changed successfully",
      suspended: selectedComment.isSuspended,
    });
  } catch (error) {
    console.log("Comment processing error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/suspendedProfilePics", async (req, res) => {
  const users = schemas.Users;

  try {
    const matchedUsers = await users.find({
      suspendedProfileImage: { $ne: "default__profile.png" },
    });
    if (!matchedUsers) {
      res.status(404).json({ error: "User not found" });
    }

    const responseData = matchedUsers.map((user) => {
      return {
        userId: user._id,
        nickname: user.nickname,
        suspendedImage: user.suspendedProfileImage,
      };
    });

    res.status(200).json({
      message: "Suspended profile pics returned successfully",
      users: responseData,
    });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ error: error });
  }
});

const deleteUserContent = async (userId) => {
  const memories = schemas.Memories;
  const comments = schemas.Comments;

  const userMemories = await memories.findById(userId);
  if (userMemories) {
    userMemories.forEach((memory) => {
      fs.unlinkSync(`../public/images/memories/${memory.image}`);
    });
  }

  await memories.deleteMany({ author: userId });
  await comments.deleteMany({ author: userId });
};

router.put("/suspendUser/:userId", async (req, res) => {
  const users = schemas.Users;

  try {
    const selectedUser = await users.findById(req.params.userId);
    if (!selectedUser) {
      res.status(404).json({ error: "User not found" });
    }

    selectedUser.isSuspended = !selectedUser.isSuspended;
    await selectedUser.save();
    if (selectedUser.isSuspended) {
      sendMessage(
        selectedUser,
        "Due to suspicious acitivity, your profile was suspended. While our team is reviewing your profile activity, you won't be able to post anything on the website",
        "Profile Suspension"
      );
    } else {
      sendMessage(
        selectedUser,
        "Our team reviewed your profile and decided that your activity meets our Community Guidelines. We're grateful for your patience and we hope that you'll have great time here!",
        "Suspension Revoke"
      );
    }
    res.status(200).json({
      message: "User's suspension status changed successfully",
      suspended: selectedUser.isSuspended,
    });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.put("/blockUser/:userId", async (req, res) => {
  const users = schemas.Users;

  try {
    const selectedUser = await users.findById(req.params.userId);
    if (!selectedUser) {
      res.status(404).json({ error: "User not found" });
    }

    selectedUser.isBlocked = !selectedUser.isBlocked;
    if (selectedUser.isBlocked) {
      deleteUserContent(selectedUser._id);
    } else {
      selectedUser.amountOfSuspiciousActivity = 0;
      sendMessage(
        selectedUser,
        'Our team reviewed your account and decided to remove previously proposed ban. Due to account ban, your content has been removed. Welcome back to "Trip Share"!',
        "Welcome Back!"
      );
    }
    await selectedUser.save();
    res.status(200).json({
      message: "User's block status changed successfully",
      blocked: selectedUser.isBlocked,
    });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const users = schemas.Users;

  try {
    const selectedUser = await users.findById(req.params.userId);
    if (!selectedUser) {
      res.status(404).json({ error: "User not found" });
    }

    await deleteUserContent(selectedUser._id);
    await selectedUser.deleteOne();
    console.log("Account removed successfully");
    res.status(204).send();
  } catch (error) {
    console.log("Error retrieving data: ", error);
    res.status(500).json({ error: "Server error occured" });
  }
});

router.put("/acceptProfilePic/:userId", async (req, res) => {
  const users = schemas.Users;

  try {
    const selectedUser = await users.findById(req.params.userId);
    if (!selectedUser) {
      res.status(404).json({ error: "User not found" });
    }
    selectedUser.profileImage = selectedUser.suspendedProfileImage;
    selectedUser.suspendedProfileImage = "default__profile.png";
    selectedUser.amountOfSuspiciousActivity =
      selectedUser.amountOfSuspiciousActivity - 1;
    selectedUser.isSuspended = false;
    selectedUser.isBlocked = false;
    await selectedUser.save();

    sendMessage(
      selectedUser,
      "Our team reviewed your previously suspended profile pic and we decided that it meets our Community Guidelines. Your previous account suspension was revoked. Enjoy your new and fresh profile picture. -TripShare team",
      "Profile Update"
    );
    res.status(200).json({
      message: "User's profile image suspension was revoked successfully!",
    });
  } catch (error) {
    console.log("Server error while accepting user's new profile pic: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/declineProfilePic/:userId", async (req, res) => {
  const users = schemas.Users;

  try {
    const requestedUser = await users.findById(req.params.userId);
    if (!requestedUser) {
      res.status(404).json({ error: "User not found" });
    }

    requestedUser.isBlocked = true;
    if (requestedUser.suspendedProfileImage != "default__profile.png") {
      fs.unlinkSync(
        `../public/images/users/${requestedUser.suspendedProfileImage}`
      );
    }
    requestedUser.suspendedProfileImage = "default__profile.png";
    await requestedUser.save();
    deleteUserContent(requestedUser._id);

    res
      .status(200)
      .json({ message: `${requestedUser.nickname} blocked successfully!` });
  } catch (error) {
    console.log("Server Error: ", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// #endregion

module.exports = router;
