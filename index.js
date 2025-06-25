
import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb+srv://mokeshramadoss1202:foP0SlhVgvB94Inl@feedback.dtaiaau.mongodb.net/FeedBack?retryWrites=true&w=majority&appName=FeedBack")
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB error:", err));

// Your API routes here, e.g.:
app.get("/api/hello", (req, res) => res.json({ msg: "Hello from API" }));

// Frontend + HMR handled by Vite
ViteExpress.listen(app, 5000, () => console.log("App running on http://localhost:3000"));
const feedbackSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: String,
  upvotes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);