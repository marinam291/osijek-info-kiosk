import express from "express";
import nodemailer from "nodemailer";
import { getEmailTemplate } from "../utils/emailTemplate.js";
import { createContactSchema } from "../schemas/contactSchema.js";

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", async (req, res) => {
  const lang = req.body.lang === "en" ? "en" : "hr";
  const contactSchema = createContactSchema(lang);
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  const { isAnonymous, senderName, senderEmail, messageBody } = result.data;

  const finalName = isAnonymous
    ? lang === "en"
      ? "Anonymous citizen"
      : "Anonimni građanin"
    : senderName!;
  const finalEmail = isAnonymous ? "info-kiosk@osijek.hr" : senderEmail!;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "marenjakmarina@gmail.com",
      subject: `[Info-Kiosk] ${isAnonymous ? (lang === "en" ? "Anonymous message" : "Anonimna poruka") : `Message - ${finalName}`}`,
      html: getEmailTemplate(finalName, finalEmail, messageBody),
    });

    res.status(200).json({
      message:
        lang === "en" ? "Email sent successfully!" : "Mail uspješno poslan!",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Greška pri slanju:", error);
    res.status(500).json({
      error:
        lang === "en" ? "Failed to send email." : "Neuspjelo slanje maila.",
    });
  }
});

export default router;
