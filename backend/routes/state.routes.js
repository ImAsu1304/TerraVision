import express from "express";
import fs from "fs";
import path from "path";
import AnalysisHistory from "../models/AnalysisHistory.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { state } = req.body;

    if (state !== "Telangana") {
      return res.status(400).json({ error: "Only Telangana is supported" });
    }

    const statsPath = path.join(process.cwd(), "data", "telangana.stats.json");
    const stats = JSON.parse(fs.readFileSync(statsPath, "utf-8"));

    // Changed to .create() so every run is saved as a new entry
    await AnalysisHistory.create({
      state: "Telangana",
      totalArea: stats.totalArea,
      breakdown: stats.breakdown,
      tiles: "/tiles/telangana/{z}/{x}/{y}.png",
      geojson: "indiaStates.geo.json"
    });

    res.json({
      stats,
      tiles: {
        url: "/tiles/telangana/{z}/{x}/{y}.png",
        minZoom: 13,
        maxZoom: 14
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze Telangana" });
  }
});

export default router;