const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const Log = require('../models/Log');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});



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

// router.post('/chat', authMiddleware, async (req, res) => {
//   try {
//     const { message } = req.body;
  
//     const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

//     const prompt = `You are a warm, empathetic female health assistant. 
//     A user named Shushmita is asking: ${message}. 
//     Provide short, helpful, and medical-friendly advice.`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
    
//     res.json({ reply: response.text() });
//   } catch (err) {
//     console.error("Gemini Error:", err);
//     res.status(500).json({ msg: "AI not responding", error: err.message });
//   }
// });

router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a warm, empathetic female health assistant for HerTracker. Give short, caring, medically safe advice."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 80,
      temperature: 0.7
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error("OPENAI ERROR:", err);
    res.status(500).json({
      reply: "AI is currently unavailable. Please try again later 🌸"
    });
  }
});


router.put('/profile', authMiddleware, async (req, res) => {
  const { cycleLength, periodLength, lastPeriodDate } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

   
    user.cycleLength = cycleLength || user.cycleLength;
    user.periodLength = periodLength || user.periodLength;
    user.lastPeriodDate = lastPeriodDate || user.lastPeriodDate;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id 
        });
        await user.save();
      }else if (!user.googleId) {
        
        user.googleId = profile.id;
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/` }),
  (req, res) => {
    
    const payload = { user: { id: req.user.id } }; 
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: 'HerTracker',
            to: email,
            subject: 'Password Reset Link',
            html: `<h3>Reset Password</h3><p>Click <a href="${resetLink}">here</a> to reset. Valid for 15 mins.</p>`
        });

        res.json({ msg: "Email has been sent!" });
    } catch (err) {
        res.status(500).json({ msg: "Error sending email" });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOneAndUpdate(
            { email: decoded.email }, 
            { password: hashedPassword }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ msg: "Password updated successfully!" });
    } catch (err) {
        res.status(400).json({ msg: "The reset link is invalid or has expired." });
    }
});





module.exports = router;