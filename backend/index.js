import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import loopRouter from "./routes/loop.routes.js";
import storyRouter from "./routes/story.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
connectDb();

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.CORS_ALLOW_ORRIGINS.split(","),
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/loop", loopRouter);
app.use("/api/story", storyRouter);
app.use("/api/message", messageRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: JSON.stringify(err.s),
    tack: err.stack,

    mongoUrl: process.env.MONGODB_URL,
  });
});
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
