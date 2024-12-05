import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./Routes/AuthRoutes.js";
import contactsRoutes from "./Routes/ContactsRoutes.js";
import setupSocket from "./socket.js";

const app = express();
const port = process.env.PORT || 3000;

// Direct MongoDB Atlas connection string
const databaseURL = "mongodb+srv://prashantkush24:cxgJn3biEAhtXP5X@cluster0.3zlb4.mongodb.net/myDatabaseName?retryWrites=true&w=majority";

app.use(
  cors({
    origin: ["http://localhost:3000"], // Replace with the frontend origin if different
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

setupSocket(server);

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err.message));
