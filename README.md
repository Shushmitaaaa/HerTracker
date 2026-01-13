# HerTracker

 HerTracker is your personal menstrual health companion that helps you understand and track your cycle with ease. It's more than just a period tracker - it predicts your next period, shows you which phase of your cycle you're in (menstrual, follicular, ovulatory, or luteal), and explains how each phase affects your energy, mood, and body. The built-in AI assistant answers all your health questions in real-time, giving you personalized advice based on where you are in your cycle. Track your daily moods, view your entire year on an interactive calendar, and get insights that help you plan your life around your natural rhythm. Your data stays completely private and secure - it's just between you and the app. Understanding your cycle isn't just about tracking periods; it's about taking control of your health, planning better, and working with your body instead of against it.

## Live Demo

![cursorful-video-1768215049598-ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/0d4e8f23-aa58-4213-affb-c2400f020dae)

**URL:** [her-tracker.vercel.app](https://her-tracker.vercel.app)

## Features
Interactive 12-month calendar with period highlighting, smart predictions based on your cycle length<br>
Real-time tracking of your cycle phase (Menstrual, Follicular, Ovulatory, Luteal) with phase-specific lifestyle tips.<br>
OpenAI-powered chatbot for personalized health advice. Ask about symptoms, cycles, and reproductive health - get evidence-based answers tailored to your current phase.<br>
Quick mood tracking with four options (Radiant, Charged, Cozy, Flowy).<br>
Customize cycle length, period duration, and last period date. Secure account management with full data encryption.<br>
Your health data never leaves the app. No third-party sharing, no data selling, encrypted connections.<br>

## Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, Axios, Lucide React  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose  
**Authentication:** Passport.js, JWT, Google OAuth 2.0  
**APIs:** OpenAI GPT, Nodemailer  
**Deployment:** Vercel (Frontend), Render (Backend)

## Work Flow
<img width="1024" height="1024" alt="Gemini_Generated_Image_8j6bud8j6bud8j6b" src="https://github.com/user-attachments/assets/9e960b47-31f3-4ca0-b126-4dea52736359" />

## Installation & Setup

### Prerequisites
Before you begin, ensure you have:
- **Node.js v18 or higher** 
- **MongoDB Atlas account**
- **Google OAuth credentials** 
- **OpenAI API key** 

### Step 1: Clone the Repository
```bash
# Clone the repository to your local machine
git clone https://github.com/yourusername/hertracker.git

# Navigate into the project folder
cd hertracker
```

### Step 2: Backend Setup
```bash
# Go to backend folder
cd backend

# Install all dependencies
npm install

# Create a .env file in the backend folder
# Add these environment variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:3000

# Start the backend server
npm start
```

### Step 3: Frontend Setup
```bash
# Open a new terminal
# Go to frontend folder from project root
cd frontend

# Install all dependencies
npm install

# Create a .env file in the frontend folder
# Add this environment variable:
REACT_APP_API_URL=http://localhost:5000

# Start the frontend development server
npm start
```

## Project Structure
```
hertracker/
├── frontend/                 
│   ├── public/
│   │   └── index.html      
│   ├── src/
│   │   ├── components/      
│   │   │   ├── Navbar.js    
│   │   │   └── CycleSection.js 
│   │   ├── pages/           
│   │   │   ├── Login.js    
│   │   │   ├── Dashboard.js 
│   │   │   ├── Profile.js   
│   │   │   └── AIChat.js    
│   │   ├── App.js          
│   │   └── index.css       
│   └── package.json         
│
└── backend/                 
    ├── models/
    │   └── User.js         
    ├── routes/
    │   └── auth.js          
    ├── middleware/
    │   └── auth.js          
    ├── config/
    │   └── passport.js     
    ├── server.js            
    └── package.json         
```


