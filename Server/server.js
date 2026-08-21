import 'dotenv/config';
import express from "express";
import cors from "cors";
import { connectDB } from "./src/db/connection.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/Auth-routes.js";
import analysisRoutes from "./src/routes/Analysis-routes.js";

const app = express();
const corsOptions = {
  origin: process.env.FRONTENDURL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user/auth", authRoutes);
app.use("/api/user/analysis", analysisRoutes);

const port = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  });
