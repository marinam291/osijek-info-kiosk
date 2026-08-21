import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", async (req, res) => {
  const { senderName, senderEmail, messageBody } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "marenjakmarina@gmail.com",
      subject: `Poruka s kioska od: ${senderName}`,
      text: `Pošiljatelj: ${senderEmail}\n\nPoruka:\n${messageBody}`,
    });

    res.status(200).json({ message: "Mail uspješno poslan!" });
  } catch (error) {
    console.error("Greška pri slanju:", error);
    res.status(500).json({ error: "Neuspjelo slanje maila." });
  }
});

export default router;
