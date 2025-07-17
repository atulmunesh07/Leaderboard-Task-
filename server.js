const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const UserSchema = new mongoose.Schema({
  name: String,
  score: { type: Number, default: 0 },
  
  //=====history of the points=======//
  pointsHistory: [
    {
      points: Number,
      date: { type: Date, default: Date.now },
    },
  ],
//======rewards to give ===========//
  rewards: [
    {
      milestone: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  lastRewardMilestone: { type: Number, default: 0 }, // tracks last rewarded 100s
});

const User = mongoose.model("User", UserSchema);

// Get all users sorted by score
app.get("/users", async (req, res) => {
  const users = await User.find().sort({ score: -1 });
  res.json(users);
});

// Add new user
app.post("/users", async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);
});

// ========Claim random points=======//
app.post("/claim/:id", async (req, res) => {
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  // Get user first
  const user = await User.findById(req.params.id);

  const newScore = user.score + randomPoints;
  const newMilestone = Math.floor(newScore / 100) * 100;

  // Build update object
  const update = {
    $inc: { score: randomPoints },
    $push: {
      pointsHistory: { points: randomPoints },
    },
  };

  // Reward logic
  if (newMilestone > user.lastRewardMilestone) {
    update.$push.rewards = {
      milestone: newMilestone,
    };
    update.$set = {
      lastRewardMilestone: newMilestone,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  res.json(updatedUser);
});


app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
