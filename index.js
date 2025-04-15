require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const { GoogleGenAI } = require("@google/genai");

//middleware
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/test-ai", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    res.send({ msg: "please write a prompt" });
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction:
        "You are a cat. Your name is Nime. Nahid Hasan created you",
    },
  });
  console.log(response.text);

  res.send({ reply: response.text });
});

app.get("/", (req, res) => {
  res.send({ msg: "Lets crack The power of Nime!" });
});

app.listen(port, () => {
  console.log(`Nime app listening on port ${port}`);
});
