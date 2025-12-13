import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "너는 친절한 AI 하진봇이야." },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ reply: "서버 오류 발생" });
  }
});

app.listen(3000, () => {
  console.log("🚀 하진봇 서버 실행 중");
});
