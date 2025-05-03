const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.send('User registered');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  const user = await User.findOne({ username, role });

  if (!user) return res.status(404).send('User not found');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).send('Invalid password');

  res.send(`Welcome ${role.charAt(0).toUpperCase() + role.slice(1)}`);
});

module.exports = router;
