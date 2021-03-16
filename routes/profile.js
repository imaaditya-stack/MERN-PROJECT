const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
  } = req.body;

  const profileFields = {
    user: req.user,
    company: company,
    website: website,
    location: location,
    status: status,
    skills: skills.split(",").map((skill) => skill.trim()),
    bio: bio,
    githubusername: githubusername,
  };

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      { $set: profileFields },
      { upsert: true, returnOriginal: false }
    );
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/experience", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    console.log(profile);
    profile.experience.unshift(req.body);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user });
    await User.findOneAndRemove({ _id: req.user });

    res.send("PROFILE DELETED SUCCESSFULLY");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/experience/:expID", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.expID
    );

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
