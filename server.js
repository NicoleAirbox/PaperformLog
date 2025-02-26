const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latestData = null;

// Endpoint to receive Paperform webhook data
app.post("/webhook", (req, res) => {
    latestData = req.body;
    console.log("Received Data:", latestData);
    res.sendStatus(200);
});

// Event Stream for Frontend Updates
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    setInterval(() => {
        if (latestData) {
            res.write(`data: ${JSON.stringify(latestData)}\n\n`);
            latestData = null; // Reset after sending
        }
    }, 3000);
});

app.listen(5500, () => {
    console.log("Listening on port 5500...");
});
