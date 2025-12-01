const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PAGE_TOKEN = "EAAKvAkXcnLkBQKT1MFjXh8cGzjfHy0Upk1wLdaqC5Uug8E8g3mxx4ok0mC5XawSCvU3sIMQxoBbs1cf6NJJNYPlTofVLzV175wgrU3Ku9fphPCfJ9isjZAGcuo7G9V4e38AasZCiHsgIULPG4UpBp2OXQ9IqB0xFTahqEETtBlGjMsH5fcbxUfN8aLptetZCQZDZD";  // <-- Yaha apna FB Token daal dena

// Verify webhook
app.get("/", (req, res) => {
  res.send("Fb Auto Reply Server Running 😊");
});

// Handle messages
app.post("/webhook", async (req, res) => {
  try {
    const entry = req.body.entry?.[0]?.messaging?.[0];
    if (!entry) return res.sendStatus(200);

    const sender = entry.sender.id;
    const message = entry.message?.text;

    if (message) {
      await sendReply(sender, "💬 Auto Reply: Aapka message mil gaya 🙏");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

// Send message function
async function sendReply(sender, text) {
  await axios.post(
    `https://graph.facebook.com/v21.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
      recipient: { id: sender },
      message: { text }
    }
  );
}

app.listen(3000, () => console.log("Server Started on Port 3000 🔥"));
