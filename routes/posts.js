const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    const post = new Post({
      user: req.user,
      content: req.body.content,
      name: user.name,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

router.delete("/:pID", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pID);
    if (!post) return res.status(400).json({ msg: "Post Doesn't Exists" });

    if (post.user.toString() !== req.user)
      return res.status(401).json({ msg: "User not authorized" });

    await Post.findOneAndRemove({ _id: req.params.pID });

    res.send("POST DELETED SUCCESSFULLY");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/like/:pID", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pID);
    if (!post) return res.status(400).json({ msg: "Post Doesn't Exists" });

    if (post.likes.some((item) => item.user.toString() === req.user))
      return res.status(400).json({ msg: "Post already liked" });

    post.likes.unshift({ user: req.user });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/unlike/:pID", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pID);
    if (!post) return res.status(400).json({ msg: "Post Doesn't Exists" });

    if (post.likes.some((item) => item.user.toString() === req.user)) {
      post.likes = post.likes.filter(
        (item) => item.user.toString() !== req.user
      );
      await post.save();
      return res.json(post.likes);
    }

    res.status(400).json({ msg: "Post has not yet been liked" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
