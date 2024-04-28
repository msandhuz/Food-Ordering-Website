const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// Get all teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find({}).sort({ score: -1 }); // Sort by score descending
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
