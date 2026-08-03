import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('turizam');
  const [language, setLanguage] = useState('HR');

  const renderContent = () => {
    switch (activeTab) {
      case 'turizam':
        return (
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Turizam i znamenitosti</Text>
            <Text style={styles.contentText}>
              Dobrodošli u Osijek! Ovdje će ići popis glavnih atrakcija poput Tvrđe, Konkatedrale, Promenade i ZOO vrta.
            </Text>
          </View>
        );
      case 'dogadjanja':
        return (
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Događanja u Osijeku</Text>
            <Text style={styles.contentText}>
              Pregled aktualnih kulturnih i sportskih manifestacija u gradu.
            </Text>
          </View>
        );
      case 'usluge':
        return (
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Usluge i Prijevoz</Text>
            <Text style={styles.contentText}>
              Vozni red GPP-a, lokacije javnih bicikala, dežurne ljekarne i parking zone.
            </Text>
          </View>
        );
      case 'karta':
        return (
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Karta grada</Text>
            <Text style={styles.contentText}>
              Prikaz interaktivne karte Osijeka s označenim ključnim lokacijama.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>GRAD OSIJEK</Text>
          <Text style={styles.logoSubtext}>Informacijski Panel</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity
            style={[styles.menuButton, activeTab === 'turizam' && styles.menuButtonActive]}
            onPress={() => setActiveTab('turizam')}
          >
            <Text style={[styles.menuButtonText, activeTab === 'turizam' && styles.menuButtonTextActive]}>
              Turizam
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, activeTab === 'dogadjanja' && styles.menuButtonActive]}
            onPress={() => setActiveTab('dogadjanja')}
          >
            <Text style={[styles.menuButtonText, activeTab === 'dogadjanja' && styles.menuButtonTextActive]}>
              Događanja
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, activeTab === 'usluge' && styles.menuButtonActive]}
            onPress={() => setActiveTab('usluge')}
          >
            <Text style={[styles.menuButtonText, activeTab === 'usluge' && styles.menuButtonTextActive]}>
              Usluge & Prijevoz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, activeTab === 'karta' && styles.menuButtonActive]}
            onPress={() => setActiveTab('karta')}
          >
            <Text style={[styles.menuButtonText, activeTab === 'karta' && styles.menuButtonTextActive]}>
              Karta grada
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.langContainer}>
          <TouchableOpacity
            style={[styles.langButton, language === 'HR' && styles.langButtonActive]}
            onPress={() => setLanguage('HR')}
          >
            <Text style={[styles.langText, language === 'HR' && styles.langTextActive]}>HR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langButton, language === 'EN' && styles.langButtonActive]}
            onPress={() => setLanguage('EN')}
          >
            <Text style={[styles.langText, language === 'EN' && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContent}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    backgroundColor: '#F4F6F8',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#0A2540', 
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  logoSubtext: {
    color: '#00D4B2',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  menuItems: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  menuButton: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  menuButtonActive: {
    backgroundColor: '#00D4B2', 
  },
  menuButtonText: {
    color: '#A0AEC0',
    fontSize: 20,
    fontWeight: '600',
  },
  menuButtonTextActive: {
    color: '#0A2540',
    fontWeight: 'bold',
  },
  langContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  langButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#A0AEC0',
    alignItems: 'center',
  },
  langButtonActive: {
    backgroundColor: '#00D4B2',
    borderColor: '#00D4B2',
  },
  langText: {
    color: '#A0AEC0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  langTextActive: {
    color: '#0A2540',
  },
  mainContent: {
    width: '75%',
    padding: 36,
  },
  contentBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 20,
    color: '#4A5568',
    lineHeight: 30,
  },
});