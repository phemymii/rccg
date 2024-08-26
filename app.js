const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the index.html file for the root URL
app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "public", "/index.html"));
});

app.get("/sermon", (req, res) => {
  res.sendfile(path.join(__dirname, "public", "/sermon.html"));
});

app.get("/contact", (req, res) => {
  res.sendfile(path.join(__dirname, "public", "/contact.html"));
});

app.get("/get-video", (req, res) => {
  const data = { message: "Hello from Express!", timestamp: new Date() };
  res.json(data);
});

app.listen(process.ENV || 4000, () => {
  console.log("Server is running on http://localhost:4000");
});
