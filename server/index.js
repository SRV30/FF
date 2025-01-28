import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.js";
dotenv.config();

process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then((data) =>
    console.log(`Mongodb connected with server: ${data.connection.host}`)
  )
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(limiter);
app.use(morgan("combined"));
app.use(errorMiddleware);
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Server is running: " + PORT);
});

//routes

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
