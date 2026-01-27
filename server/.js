import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/submit", upload.single("file"), async (req, res) => {
  try {
    const { name, mobile, email, date, gender } = req.body;
    const file = req.file;

    if (!name || !mobile || !email || !date || !file) {
      return res.status(400).json({ ok: false, message: "Missing fields" });
    }

    const message = `
📋 New Form Submission

👤 Name: ${name}
📞 Phone: ${mobile}
📧 Email: ${email}
🎂 DOB: ${date}
🚻 Gender: ${gender || "Not selected"}
⏰ Time: ${new Date().toLocaleString()}
`;

    // Send message
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    // Send file
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("document", file.buffer, file.originalname);

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: formData
    });

    res.json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
