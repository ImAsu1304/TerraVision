import express from "express";
import AnalysisHistory from "../models/AnalysisHistory.js";

const router = express.Router();

/**
 * GET /api/history
 * Returns latest analysis runs (newest first)
 */
router.get("/", async (req, res) => {
  try {
    const history = await AnalysisHistory
      .find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

/**
 * POST /api/history
 * Saves one completed analysis record
 */
router.post("/", async (req, res) => {
  try {
    const record = new AnalysisHistory(req.body);
    await record.save();

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

export default router;
