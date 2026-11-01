const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

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