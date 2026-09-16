import { z } from "zod";
import validator from "validator";

const badWords = ["psovka1", "psovka2", "glupostprimjer"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const createContactSchema = (lang: "hr" | "en" = "hr") => {
  const messages = {
    hr: {
      nameMax: "Ime ne smije imati više od 40 znakova.",
      emailInvalid: "Neispravan format email adrese.",
      emailMax: "Email ne smije imati više od 40 znakova.",
      messageEmpty: "Poruka ne smije biti prazna.",
      badWords: "Poruka sadrži nedozvoljene izraze.",
      nameRequired: "Ime je obavezno ako poruka nije anonimna.",
      emailRequired: "Email je obavezan ako poruka nije anonimna.",
    },
    en: {
      nameMax: "Name must not exceed 40 characters.",
      emailInvalid: "Invalid email format.",
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
      senderName: z.preprocess(
        (value) =>
          typeof value === "string" && value.trim() === "" ? undefined : value,
        z
          .string()
          .transform((val) => validator.escape(val.trim()))
          .pipe(z.string().max(40, t.nameMax))
          .optional(),
      ),
      senderEmail: z.preprocess(
        (value) =>
          typeof value === "string" && value.trim() === "" ? undefined : value,
        z
          .string()
          .transform((val) => validator.normalizeEmail(val.trim()) || val)
          .pipe(
            z.string().regex(emailPattern, t.emailInvalid).max(50, t.emailMax),
          )
          .optional(),
      ),
      messageBody: z
        .string()
        .transform((val) => validator.escape(val.trim()))
        .pipe(
          z
            .string()
            .min(1, t.messageEmpty)
            .refine(
              (val) => {
                const lowerVal = val.toLowerCase();
                return !badWords.some((word) => lowerVal.includes(word));
              },
              { message: t.badWords },
            ),
        ),
    })
    .superRefine((data, ctx) => {
      if (!data.isAnonymous) {
        if (!data.senderName || data.senderName === "") {
          ctx.addIssue({
            code: "custom",
            message: t.nameRequired,
            path: ["senderName"],
          });
        }
        if (!data.senderEmail || data.senderEmail === "") {
          ctx.addIssue({
            code: "custom",
            message: t.emailRequired,
            path: ["senderEmail"],
          });
        }
      }
    });
};
