const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  avatarUrl: String,
  achievements: [String]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
