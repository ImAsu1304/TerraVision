import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load GeoJSON safely
const geoPath = path.join(__dirname, "../assets/indiaStates.geo.json");
const geoData = JSON.parse(fs.readFileSync(geoPath, "utf-8"));

router.get("/telangana", (req, res) => {
  const telangana = geoData.features.find(
    f => f.properties.ST_NM === "Telangana"
  );

  if (!telangana) {
    return res.status(404).json({ error: "Telangana not found" });
  }

  res.json(telangana);
});

export default router;
