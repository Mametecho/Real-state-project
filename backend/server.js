import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import listingRoute from "./routes/listingRoute.js";
import CORS from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CORS());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
