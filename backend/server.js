require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const protectedRoutes = require("./routes/protected");
const emailRoutes = require("./routes/email");
const bookmarkRoutes = require("./routes/bookmarks");

const app = express();
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "BanyanHire Backend Server is running ✓" });
});

const port = process.env.PORT || 3005;

connectDB().then(() => {
  // register routes after DB is connected
  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/applications", applicationRoutes);
  app.use("/api/protected", protectedRoutes);
  app.use("/api/email", emailRoutes);
  app.use("/api/bookmarks", bookmarkRoutes);

  app.listen(port, () => console.log(`Listening on port: ${port}`));
}).catch(console.error);