import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { ThemeColors } from "../../context/ThemeContext";

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

  const handleSendEmail = async () => {
    if (!senderName || !senderEmail || !messageBody) {
      alert(isHR ? "Molimo ispunite sva polja." : "Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName,
          senderEmail,
          messageBody,
        }),
      });

      if (response.ok) {
        alert(
          isHR ? "Poruka je uspješno poslana!" : "Message sent successfully!",
        );
        setSenderName("");
        setSenderEmail("");
        setMessageBody("");
      } else {
        alert(
          isHR ? "Došlo je do greške pri slanju." : "Failed to send message.",
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Greška:", error);
      alert(
        isHR
          ? "Nije moguće uspostaviti vezu sa serverom."
          : "Unable to connect to the server.",
      );
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
            {isHR ? "Vaše ime i prezime" : "Full Name"}
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
            {isHR ? "Vaša e-mail adresa" : "Email Address"}
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
            placeholder={isHR ? "npr. ivan@email.com" : "e.g. john@email.com"}
            placeholderTextColor={colors.textSecondary + "80"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={senderEmail}
            onChangeText={setSenderEmail}
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
        >
          <Text
            style={[
              styles.sendButtonText,
              {
                fontSize: 24 * scale,
              },
            ]}
          >
            {isHR ? "Pošalji poruku" : "Send Message"}
          </Text>
        </TouchableOpacity>
      </View>
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
});
