import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/WeatherDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Debugging MongoDB connection status
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define a schema & model for weather data
const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  weather: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", weatherSchema);

// Define a schema & model for feedback
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  comments: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Route to save weather data
app.post("/save-weather", async (req, res) => {
  try {
    const { city, temperature, weather } = req.body;
    if (!city || !temperature || !weather) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEntry = new Weather({ city, temperature, weather });
    await newEntry.save();
    res.status(201).json({ message: "Weather data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to fetch stored weather data
app.get("/weather-history", async (req, res) => {
  try {
    const data = await Weather.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to save feedback data
app.post("/submit-feedback", async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;
    if (!name || !email || !rating || !comments) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, rating, comments });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to fetch feedback history with pagination
app.get("/feedback-history", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const feedbacks = await Feedback.find().sort({ date: -1 }).skip(skip).limit(limit);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));