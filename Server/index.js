import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./Routes/AuthRoutes.js";
import contactsRoutes from "./Routes/ContactsRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./Routes/MessagesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
console.log('CORS Origin:', process.env.ORIGIN); // To confirm the value


app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

setupSocket(server);

mongoose
  .connect(databaseURL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err.message));
