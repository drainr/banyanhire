const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3005;

connectDB().then(() => {
  // register routes after DB is connected
  app.use("/api/auth",         require("./routes/auth"));
  app.use("/api/jobs",         require("./routes/jobs"));
  app.use("/api/applications", require("./routes/applications"));

  app.listen(port, () => console.log(`Listening on port: ${port}`));
}).catch(console.error);