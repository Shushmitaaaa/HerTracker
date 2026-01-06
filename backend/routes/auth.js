const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const Log = require('../models/Log');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

   
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ msg: "User registered successfully!" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/logs', authMiddleware, async (req, res) => {
  try {
    const newLog = new Log({
      user: req.user.id,
      symptoms: req.body.symptoms,
      phase: req.body.phase
    });
    await newLog.save();
    res.json({ msg: "Log saved successfully!" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `You are a warm, empathetic female health assistant. 
    A user named Shushmita is asking: ${message}. 
    Provide short, helpful, and medical-friendly advice.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ msg: "AI not responding", error: err.message });
  }
});




module.exports = router;