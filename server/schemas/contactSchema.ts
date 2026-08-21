import { z } from "zod";

const badWords = ["psovka1", "psovka2", "uvreda"];

export const createContactSchema = (lang: "hr" | "en" = "hr") => {
  const messages = {
    hr: {
      nameMax: "Ime ne smije imati više od 40 znakova.",
      emailInvalid: "Neispravan format email adrese.",
      emailGmail: "Email mora biti Gmail adresa.",
      emailMax: "Email ne smije imati više od 40 znakova.",
      messageEmpty: "Poruka ne smije biti prazna.",
      badWords: "Poruka sadrži nedozvoljene izraze.",
      nameRequired: "Ime je obavezno ako poruka nije anonimna.",
      emailRequired: "Email je obavezan ako poruka nije anonimna.",
    },
    en: {
      nameMax: "Name must not exceed 40 characters.",
      emailInvalid: "Invalid email format.",
      emailGmail: "Email must be a Gmail address.",
      emailMax: "Email must not exceed 40 characters.",
      messageEmpty: "Message cannot be empty.",
      badWords: "Message contains restricted words.",
      nameRequired: "Name is required if the message is not anonymous.",
      emailRequired: "Email is required if the message is not anonymous.",
    },
  };

  const t = messages[lang];

  return z
    .object({
      isAnonymous: z.boolean(),
      lang: z.enum(["hr", "en"]).optional(),
      senderName: z.string().max(40, t.nameMax).optional(),
      senderEmail: z
        .string()
        .email(t.emailInvalid)
        .endsWith("@gmail.com", t.emailGmail)
        .max(40, t.emailMax)
        .optional(),
      messageBody: z
        .string()
        .min(1, t.messageEmpty)
        .refine(
          (val) => {
            const lowerVal = val.toLowerCase();
            return !badWords.some((word) => lowerVal.includes(word));
          },
          {
            message: t.badWords,
          },
        ),
    })
    .superRefine((data, ctx) => {
      if (!data.isAnonymous) {
        if (!data.senderName || data.senderName.trim() === "") {
          ctx.addIssue({
            code: "custom",
            message: t.nameRequired,
            path: ["senderName"],
          });
        }
        if (!data.senderEmail || data.senderEmail.trim() === "") {
          ctx.addIssue({
            code: "custom",
            message: t.emailRequired,
            path: ["senderEmail"],
          });
        }
      }
    });
};
