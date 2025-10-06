// server.js Node.js + Express
const express = require("express");
const cors = require("cors");
const { Translate } = require("@google-cloud/translate").v2;

const app = express();
app.use(cors());
app.use(express.json());

// Make sure to set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON
const translate = new Translate();

app.post("/api/translate", async (req, res) => {
  try {
    const { text, target } = req.body;
    const [translation] = await translate.translate(text, target);
    res.json({ translatedText: translation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
