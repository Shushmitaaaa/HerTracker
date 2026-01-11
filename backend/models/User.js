// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cycleLength: { type: Number, default: 28 },
//   periodLength: { type: Number, default: 5 },
//   lastPeriodDate: { type: Date },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    // Conditional Requirement: Agar googleId nahi hai, tabhi password required hoga
    required: function() {
      return !this.googleId; 
    }
  },
  // Google Login track karne ke liye
  googleId: { 
    type: String,
    unique: true,
    sparse: true // Taaki normal users ke liye null hone par bhi 'unique' error na aaye
  },
  cycleLength: { 
    type: Number, 
    default: 28 
  },
  periodLength: { 
    type: Number, 
    default: 5 
  },
  lastPeriodDate: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);