import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import stateRoutes from "./routes/state.routes.js";
import historyRoutes from "./routes/history.routes.js";
import geoRoutes from "./routes/geo.routes.js";

// SETUP
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Serve tiles statically
app.use("/tiles", express.static(path.join(__dirname, "tiles")));

// ROUTES
app.use("/api/state", stateRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/geo", geoRoutes);

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});