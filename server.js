server.js
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let user = {
  coins: 0,
  plantedAt: null,
  ready: false,
  deliveriesToday: 0
};

const PLANT_TIME = 10 * 1000; // 10 seconds
const DAILY_LIMIT = 5;

app.post("/plant", (req, res) => {
  if (user.plantedAt) {
    return res.json({ error: "Already planted" });
  }

  user.plantedAt = Date.now();
  user.ready = false;

  setTimeout(() => {
    user.ready = true;
  }, PLANT_TIME);

  res.json({ message: "Crop planted" });
});

app.post("/harvest", (req, res) => {
  if (!user.ready) {
    return res.json({ error: "Crop not ready yet" });
  }

  user.coins += 10;
  user.plantedAt = null;
  user.ready = false;

  res.json({ message: "Harvested +10 coins", coins: user.coins });
});

app.post("/delivery", (req, res) => {
  if (user.deliveriesToday >= DAILY_LIMIT) {
    return res.json({ error: "Daily delivery limit reached" });
  }

  user.deliveriesToday += 1;
  user.coins += 5;

  res.json({
    message: "Delivery completed +5 coins",
    coins: user.coins,
    deliveriesLeft: DAILY_LIMIT - user.deliveriesToday
  });
});

app.get("/status", (req, res) => {
  res.json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
