const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://image-to-url-converter.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins
}));

app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("Image Converter Backend is Running!");
});

const PORT =process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();