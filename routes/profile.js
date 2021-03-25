const express = require("express");
const request = require("request");
const config = require("config");
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

router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
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
  console.log(status);
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

router.put("/education", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    profile.education.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/education/:eduID", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    profile.education = profile.education.filter(
      (item) => item._id.toString() !== req.params.eduID
    );

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "GIT_CLIENTID"
      )}&client_secret=${config.get("GIT_SECRETID")}`,
      method: "GET",
      headers: { "User-Agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200)
        res.status(400).json({ msg: "No Github Profile found" });

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
