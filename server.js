const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Team = require('./models/Team'); // Make sure the path is correct

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// Route to get all teams
app.get('/api/teams', (req, res) => {
    Team.find({})
        .then(teams => {
            console.log(teams);  // Log to verify backend data structure
            res.json(teams);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
