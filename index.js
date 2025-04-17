require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const { GoogleGenAI } = require("@google/genai");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const uri = process.env.MONGO_DB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const database = client.db("geminiClone");

    const geminiCollection = database.collection("gemini");

    app.post("/test-ai", async (req, res) => {
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
      const reply = response?.text;
      console.log(reply);

      const data = {
        prompt,
        reply,
      };
      const result = await geminiCollection.insertOne(data);

      res.send(result);
    });
    app.get("/response-ai", async (req, res) => {
      const result = await geminiCollection.find().toArray();
      res.send(result);
    });

    app.get("/", (req, res) => {
      res.send({ msg: "Lets crack The power of Nime!" });
    });

    app.listen(port, () => {
      console.log(`Nime app listening on port ${port}`);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
