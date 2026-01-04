const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send("Server is roaring, Bhaai!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.use('/api/auth', require('./routes/auth'));
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});