import express from "express";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
