import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { ThemeColors } from "../../context/ThemeContext";
import { apiUrl } from "@/services/api";

type MayorContactWidgetProps = {
  colors: ThemeColors;
  language: string;
};

export default function MayorContactWidget({
  colors,
  language,
}: MayorContactWidgetProps) {
  const isHR = language === "HR";
  const { width } = useWindowDimensions();
  const scale = width / 1920;

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!notificationMessage) return;

    const timer = setTimeout(() => {
      setNotificationMessage(null);
    }, 8000);

    return () => clearTimeout(timer);
  }, [notificationMessage]);

  const handleSendEmail = async () => {
    if (isSending) return;

    if (!isAnonymous && (!senderName || !senderEmail || !messageBody)) {
      setNotificationMessage(
        isHR ? "Molimo ispunite sva polja." : "Please fill in all fields.",
      );
      return;
    }
    if (isAnonymous && !messageBody) {
      setNotificationMessage(
        isHR ? "Molimo unesite poruku." : "Please enter a message.",
      );
      return;
    }

    if (!isAnonymous && senderEmail) {
      try {
        const checkRes = await fetch(apiUrl("/api/check-email-block"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: senderEmail }),
        });
        const checkData = await checkRes.json();

        if (checkData.isBlocked) {
          setNotificationMessage(
            isHR
              ? `Ovaj email je privremeno blokiran za korištenje na kiosku još ${checkData.daysLeft} dana zbog ranijeg odustajanja.`
              : `This email is temporarily blocked from kiosk use for another ${checkData.daysLeft} days.`,
          );
          return;
        }
      } catch {
        setNotificationMessage(
          isHR ? "Greška prilikom provjere emaila." : "Error checking email.",
        );
        return;
      }
    }

    setIsSending(true);
    let requestTimeout: ReturnType<typeof setTimeout> | undefined;

    try {
      const controller = new AbortController();
      requestTimeout = setTimeout(() => controller.abort(), 30000);
      const response = await fetch(apiUrl("/api/send-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          isAnonymous,
          senderName: isAnonymous ? "" : senderName,
          senderEmail: isAnonymous ? "" : senderEmail,
          messageBody,
          lang: isHR ? "hr" : "en",
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setNotificationMessage(
          isAnonymous
            ? isHR
              ? "Mail je uspješno poslan gradonačelniku."
              : "Your message was sent successfully to the Mayor."
            : data.verificationNeeded
              ? isHR
                ? "Verifikacijski email je poslan na vašu adresu! Morate ga potvrditi u svom pretincu kako bi poruka bila poslana gradonačelniku."
                : "Verification email sent to your address! You must confirm it in your inbox for the message to be sent."
              : isHR
                ? "Mail je uspješno poslan gradonačelniku."
                : "Your message was sent successfully to the Mayor.",
        );
        setSenderName("");
        setSenderEmail("");
        setMessageBody("");
        setIsAnonymous(false);
      } else {
        setNotificationMessage(
          data.error ||
            (isHR
              ? "Došlo je do greške pri slanju."
              : "Failed to send message."),
        );
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error("Greška:", error);
      setNotificationMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? isHR
            ? "Slanje traje predugo. Provjerite SMTP postavke servera i pokušajte ponovno."
            : "The request took too long. Check the server SMTP settings and try again."
          : isHR
            ? "Nije moguće uspostaviti vezu sa serverom."
            : "Unable to connect to the server.",
      );
    } finally {
      if (requestTimeout) clearTimeout(requestTimeout);
      setIsSending(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { maxWidth: 1000 * scale, paddingBottom: 30 * scale },
      ]}
    >
      <Text
        style={[
          styles.description,
          {
            color: colors.textSecondary,
            fontSize: 22 * scale,
            marginBottom: 28 * scale,
            lineHeight: 32 * scale,
          },
        ]}
      >
        {isHR
          ? "Imate prijedlog, pitanje ili problem? Pošaljite poruku direktno u Ured gradonačelnika."
          : "Do you have a suggestion, question, or issue? Send a message directly to the Mayor's Office."}
      </Text>

      <View style={[styles.formContainer, { gap: 24 * scale }]}>
        <TouchableOpacity
          style={[
            styles.anonymousToggle,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              height: 60 * scale,
              borderRadius: 14 * scale,
              paddingHorizontal: 20 * scale,
              borderWidth: 1.5 * scale,
            },
          ]}
          onPress={() => setIsAnonymous(!isAnonymous)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.checkboxIndicator,
              {
                width: 28 * scale,
                height: 28 * scale,
                borderRadius: 6 * scale,
                borderColor: colors.accent,
                backgroundColor: isAnonymous ? colors.accent : "transparent",
                borderWidth: 2,
              },
            ]}
          />
          <Text
            style={[
              styles.anonymousText,
              {
                color: colors.textPrimary,
                fontSize: 18 * scale,
                marginLeft: 15 * scale,
              },
            ]}
          >
            {isHR ? "Pošalji poruku anonimno" : "Send message anonymously"}
          </Text>
        </TouchableOpacity>

        {!isAnonymous && (
          <>
            <View style={[styles.inputGroup, { gap: 8 * scale }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.textPrimary,
                    fontSize: 20 * scale,
                  },
                ]}
              >
                {isHR
                  ? "Vaše ime i prezime (max 40 znakova)"
                  : "Full Name (max 40 chars)"}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.cardBackground,
                    color: colors.textPrimary,
                    borderColor: colors.border,
                    height: 70 * scale,
                    borderRadius: 16 * scale,
                    paddingHorizontal: 22 * scale,
                    fontSize: 20 * scale,
                    borderWidth: 1.5 * scale,
                  },
                ]}
                placeholder={isHR ? "npr. Ivan Horvat" : "e.g. John Doe"}
                placeholderTextColor={colors.textSecondary + "80"}
                maxLength={40}
                value={senderName}
                onChangeText={setSenderName}
              />
            </View>

            <View style={[styles.inputGroup, { gap: 8 * scale }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.textPrimary,
                    fontSize: 20 * scale,
                  },
                ]}
              >
                {isHR
                  ? "Vaša email adresa (max 50 znakova)"
                  : "Email Address (max 50 chars)"}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.cardBackground,
                    color: colors.textPrimary,
                    borderColor: colors.border,
                    height: 70 * scale,
                    borderRadius: 16 * scale,
                    paddingHorizontal: 22 * scale,
                    fontSize: 20 * scale,
                    borderWidth: 1.5 * scale,
                  },
                ]}
                placeholder={
                  isHR ? "npr. ime@domena.hr" : "e.g. name@example.com"
                }
                placeholderTextColor={colors.textSecondary + "80"}
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={50}
                value={senderEmail}
                onChangeText={setSenderEmail}
              />
            </View>
          </>
        )}

        <View style={[styles.inputGroup, { gap: 8 * scale }]}>
          <Text
            style={[
              styles.label,
              {
                color: colors.textPrimary,
                fontSize: 20 * scale,
              },
            ]}
          >
            {isHR ? "Vaša poruka" : "Your Message"}
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                borderColor: colors.border,
                height: 220 * scale,
                borderRadius: 16 * scale,
                paddingHorizontal: 22 * scale,
                paddingTop: 18 * scale,
                fontSize: 20 * scale,
                borderWidth: 1.5 * scale,
              },
            ]}
            placeholder={
              isHR ? "Napišite poruku ovdje..." : "Write your message here..."
            }
            placeholderTextColor={colors.textSecondary + "80"}
            multiline={true}
            numberOfLines={5}
            value={messageBody}
            onChangeText={setMessageBody}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: colors.accent,
              height: 75 * scale,
              borderRadius: 16 * scale,
              marginTop: 15 * scale,
            },
          ]}
          onPress={handleSendEmail}
          activeOpacity={0.8}
          disabled={isSending}
        >
          <Text
            style={[
              styles.sendButtonText,
              {
                fontSize: 24 * scale,
              },
            ]}
          >
            {isSending
              ? isHR
                ? "Slanje..."
                : "Sending..."
              : isHR
                ? "Pošalji poruku"
                : "Send Message"}
          </Text>
        </TouchableOpacity>
      </View>

      {notificationMessage && (
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                borderRadius: 20 * scale,
                padding: 30 * scale,
                borderWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                {
                  color: colors.textPrimary,
                  fontSize: 22 * scale,
                  marginBottom: 12 * scale,
                },
              ]}
            >
              Info Kiosk
            </Text>
            <Text
              style={[
                styles.modalDesc,
                {
                  color: colors.textSecondary,
                  fontSize: 18 * scale,
                  marginBottom: 25 * scale,
                  lineHeight: 26 * scale,
                },
              ]}
            >
              {notificationMessage}
            </Text>

            <TouchableOpacity
              style={[
                styles.modalBtnOk,
                {
                  backgroundColor: colors.accent,
                  borderRadius: 12 * scale,
                  paddingVertical: 12 * scale,
                  paddingHorizontal: 30 * scale,
                },
              ]}
              onPress={() => setNotificationMessage(null)}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 18 * scale,
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },
  description: {
    fontWeight: "400",
  },
  formContainer: {},
  anonymousToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  anonymousText: {
    fontWeight: "500",
  },
  inputGroup: {},
  label: {
    fontWeight: "bold",
  },
  input: {},
  textArea: {
    textAlignVertical: "top",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalBox: {
    width: "80%",
    maxWidth: 550,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
  },
  modalDesc: {
    textAlign: "center",
  },
  modalBtnOk: {
    alignItems: "center",
  },
});
