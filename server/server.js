const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/mongodb");
const authRouter = require("./routes/authRoutes");

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

// Api endpoints
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
