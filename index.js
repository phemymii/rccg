const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
app.get("/youtube-videos", async (req, res) => {
  const MAX_RESULTS = 50;
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
    const response = await axios.get(url);
    console.log(response);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching YouTube data:", error.response);
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
});

app.get("/one-youtube-video", async (req, res) => {
  const MAX_RESULTS = 1;
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
});

app.post("/rccgcontact", async function (req, res) {
  const { name, email, phone, message } = req.body;
  const MAILER_EMAIL = process.env.MAILER_EMAIL;
  const MAILER_PASSWORD = process.env.MAILER_PASSWORD;

  try {
    // Function to send an email using Nodemailer
    const sendAnEmail = async (email, message, name, phone) => {
      let transporter = nodemailer.createTransport({
        host: "mail.rccgopenheavenshalifax.com",
        port: 465,
        tls: {
          rejectUnauthorized: false,
        },
        secure: true, // true for 465, false for other ports
        auth: {
          user: MAILER_EMAIL,
          pass: MAILER_PASSWORD,
        },
      });

      // Email to the user
      await transporter.sendMail({
        from: `"RCCG Open Heavens Halifax" <${MAILER_EMAIL}>`,
        to: email,
        subject: "Message Received",
        html: `<center><div><h2 style="text-align: center">RCCG Open Heavens Halifax</h2><p>Hello <b>${name}</b>,<p>Thanks for sending us a message. We will get back to you shortly. <p>Stay blessed.</p></p></p></div></center>`,
      });

      // Email to the admin
      await transporter.sendMail({
        from: `"RCCG Open Heavens Halifax" <${MAILER_EMAIL}>`,
        to: MAILER_EMAIL,
        subject: "New Message Received",
        html: `<center><div><h2 style="text-align: center">RCCG Open Heavens Halifax</h2><p><b>Name:</b> ${name}<br /><b>Email:</b> ${email} <br /><b>Phone:</b> ${phone} <br /><b>Message:</b> ${message}</p></div></center>`,
      });
    };

    // Send the emails
    await sendAnEmail(email, message, name, phone);

    // Send a success response
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on http://localhost:4000");
});
