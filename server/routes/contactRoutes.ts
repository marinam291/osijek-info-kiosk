import express from "express";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { getEmailTemplate } from "../utils/emailTemplate.js";
import { createContactSchema } from "../schemas/contactSchema.js";
import logger from "../config/logger.js";

const router = express.Router();

const blockedEmails = new Map();
const pendingMessages = new Map();

router.post("/check-email-block", (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email je obavezan" });
  }

  const cleanEmail = email.trim().toLowerCase();
  const unblockTime = blockedEmails.get(cleanEmail);
  const now = Date.now();

  if (unblockTime && now < unblockTime) {
    const daysLeft = Math.ceil((unblockTime - now) / (1000 * 60 * 60 * 24));
    return res.json({ isBlocked: true, daysLeft });
  }

  if (unblockTime) {
    blockedEmails.delete(cleanEmail);
  }

  return res.json({ isBlocked: false });
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const lang = req.body.lang === "en" ? "en" : "hr";
    const errorMessage =
      lang === "en"
        ? "Too many messages sent from this device. Please try again later."
        : "Previše poslanih poruka s ovog uređaja. Molimo pokušajte ponovno kasnije.";

    res.status(429).json({ error: errorMessage });
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", contactLimiter, async (req, res) => {
  const lang = req.body.lang === "en" ? "en" : "hr";

  const contactSchema = createContactSchema(lang);
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  const { isAnonymous, senderName, senderEmail, messageBody } = result.data;

  if (!isAnonymous && senderEmail) {
    const cleanEmail = senderEmail.trim().toLowerCase();
    const unblockTime = blockedEmails.get(cleanEmail);
    if (unblockTime && Date.now() < unblockTime) {
      return res.status(403).json({
        error:
          lang === "en"
            ? "This email is temporarily blocked from kiosk use."
            : "Ovaj email je privremeno blokiran za korištenje na kiosku.",
      });
    }

    const token =
      Math.random().toString(36).substring(2) + Date.now().toString(36);

    pendingMessages.set(token, {
      senderName,
      senderEmail: cleanEmail,
      messageBody,
      lang,
    });

    const serverBaseUrl =
      process.env.PUBLIC_SERVER_URL ||
      `http://localhost:${process.env.PORT || 5000}`;

    const confirmUrl = `${serverBaseUrl}/api/verify-email?token=${token}&action=confirm`;
    const cancelUrl = `${serverBaseUrl}/api/verify-email?token=${token}&action=cancel`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: cleanEmail,
        subject:
          lang === "en"
            ? "Verify your message to the Mayor"
            : "Potvrdite slanje poruke gradonačelniku",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333333;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-top: 0;">
              ${lang === "en" ? "InfoKiosk Verification" : "InfoKiosk Verifikacija"}
            </h2>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">
              ${lang === "en" ? "Someone tried to send a message to the Mayor using your email address from the InfoKiosk." : "Netko je pokušao poslati poruku gradonačelniku s vaše email adrese s InfoKioska."}
            </p>
            
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 15px; color: #555555;"><strong>${lang === "en" ? "Message content:" : "Sadržaj poruke:"}</strong></p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: #222222; font-size: 16px;">"${messageBody}"</p>
            </div>
            
            <p style="font-size: 16px; margin-top: 25px; margin-bottom: 20px; color: #333333; font-weight: bold;">
              ${lang === "en" ? "Did you send this? Please choose an option below:" : "Jeste li to bili vi? Molimo odaberite opciju:"}
            </p>
            
            <!-- GUMBI SLOŽENI DA SE NE PRELAMAJU -->
            <div style="margin-top: 20px;">
              <a href="${confirmUrl}" style="background-color: #28a745; color: #ffffff; padding: 14px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: block; text-align: center; margin-bottom: 12px; font-size: 16px;">
                ${lang === "en" ? "Yes, send message" : "Da, pošalji poruku"}
              </a>
              <a href="${cancelUrl}" style="background-color: #dc3545; color: #ffffff; padding: 14px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: block; text-align: center; font-size: 16px;">
                ${lang === "en" ? "No, block for 1 week" : "Ne želim / Blokiraj na 1 tjedan"}
              </a>
            </div>
            
            <p style="font-size: 12px; color: #888888; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
              ${lang === "en" ? "If you didn't request this, you can safely ignore this email or click block." : "Ako niste zatražili ovo, možete zanemariti mail ili kliknuti blokiraj."}
            </p>
          </div>
        `,
      });

      return res.status(200).json({
        verificationNeeded: true,
        message:
          lang === "en"
            ? "Verification email sent. Please check your inbox."
            : "Verifikacijski mail je poslan. Molimo provjerite svoju poštu.",
      });
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Greška pri slanju verifikacijskog maila: ${errMessage}`);
      return res.status(500).json({ error: "Greška pri slanju verifikacije." });
    }
  }

  const finalName = lang === "en" ? "Anonymous citizen" : "Anonimni građanin";
  const finalEmail = "info-kiosk@osijek.hr";

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "marenjakmarina@gmail.com",
      subject: `[Info-Kiosk] ${lang === "en" ? "Anonymous message" : "Anonimna poruka"}`,
      html: getEmailTemplate(finalName, finalEmail, messageBody),
    });

    res.status(200).json({
      message:
        lang === "en" ? "Email sent successfully!" : "Mail uspješno poslan!",
    });
  } catch {
    res.status(500).json({ error: "Neuspjelo slanje maila." });
  }
});

router.get("/verify-email", async (req, res) => {
  const { token, action } = req.query;

  if (!token || typeof token !== "string" || !pendingMessages.has(token)) {
    return res.send(
      "<h3 style='text-align:center; margin-top:50px; font-family:Arial;'>Nevažeći ili već iskorišteni link za verifikaciju.</h3>",
    );
  }

  const messageData = pendingMessages.get(token);
  pendingMessages.delete(token);

  if (action === "cancel") {
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    blockedEmails.set(messageData.senderEmail, Date.now() + oneWeekInMs);

    return res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h2 style="color: #dc3545;">Slanje je uspješno poništeno.</h2>
        <p>Vaša adresa je blokirana za korištenje na InfoKiosku sljedećih 7 dana kako bi se spriječila daljnja zlouporaba.</p>
      </div>
    `);
  }

  if (action === "confirm") {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "marenjakmarina@gmail.com",
        subject: `[Info-Kiosk] Message - ${messageData.senderName}`,
        html: getEmailTemplate(
          messageData.senderName,
          messageData.senderEmail,
          messageData.messageBody,
        ),
      });

      return res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2 style="color: #28a745;">Uspješno ste potvrdili i poslali poruku gradonačelniku!</h2>
          <p>Hvala vam. Možete zatvoriti ovaj prozor.</p>
        </div>
      `);
    } catch {
      return res.send(
        "<h3 style='text-align:center; margin-top:50px; font-family:Arial;'>Došlo je do greške prilikom slanja poruke u Ured gradonačelnika.</h3>",
      );
    }
  }

  res.send("<h3>Nepoznata akcija.</h3>");
});

export default router;
