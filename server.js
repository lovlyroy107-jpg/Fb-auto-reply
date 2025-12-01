
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const message = req.body.message || "Hello! Auto Reply is ON 😎";

  console.log("User Message:", message);

  return res.json({
    reply: "Auto-reply: " + message,
  });
});

app.get("/", (req, res) => {
  res.send("Facebook Auto Reply Server is Running ✔");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
