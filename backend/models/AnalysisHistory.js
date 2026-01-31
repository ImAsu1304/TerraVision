import mongoose from "mongoose";

const AnalysisHistorySchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      index: true
    },

    totalArea: {
      type: Number,
      required: true
    },

    breakdown: {
      vegetation: Number,
      water: Number,
      build_area: Number,
      bare_ground: Number,
      snow: Number
    },

    tiles: {
      type: String, // e.g. /tiles/telangana/{z}/{x}/{y}.png
      required: true
    },

    geojson: {
      type: String // path or identifier 
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

export default mongoose.model("AnalysisHistory", AnalysisHistorySchema);