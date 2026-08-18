import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
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

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const handleSendEmail = () => {
    if (!senderName || !senderEmail || !messageBody) {
      alert(isHR ? "Molimo ispunite sva polja." : "Please fill in all fields.");
      return;
    }

    const recipient = "gradonacelnik@osijek.hr";
    const subject = encodeURIComponent(
      isHR
        ? `Poruka građana s kioska - ${senderName}`
        : `Citizen message from kiosk - ${senderName}`,
    );
    const body = encodeURIComponent(
      isHR
        ? `Pošiljatelj: ${senderName} (${senderEmail})\n\nPoruka:\n${messageBody}`
        : `Sender: ${senderName} (${senderEmail})\n\nMessage:\n${messageBody}`,
    );

    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {isHR
          ? "Imate prijedlog, pitanje ili problem? Pošaljite poruku direktno u Ured gradonačelnika."
          : "Do you have a suggestion, question, or issue? Send a message directly to the Mayor's Office."}
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            {isHR ? "Vaše ime i prezime" : "Full Name"}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                borderColor: colors.border,
              },
            ]}
            placeholder={isHR ? "npr. Ivan Horvat" : "e.g. John Doe"}
            placeholderTextColor={colors.textSecondary + "80"}
            value={senderName}
            onChangeText={setSenderName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            {isHR ? "Vaša e-mail adresa" : "Email Address"}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                borderColor: colors.border,
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

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            {isHR ? "Vaša poruka" : "Your Message"}
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                borderColor: colors.border,
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
          style={[styles.sendButton, { backgroundColor: colors.accent }]}
          onPress={handleSendEmail}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>
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
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
    paddingBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 16,
    textAlignVertical: "top",
  },
  sendButton: {
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
