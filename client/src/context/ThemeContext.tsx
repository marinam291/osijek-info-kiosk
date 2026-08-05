import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemeMode = "dark" | "light";

export interface ThemeColors {
  background: string;
  sidebarBackground: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  accentText: string;
  modalBackground: string;
  modalContent: string;
}

export const themes: Record<ThemeMode, ThemeColors> = {
  dark: {
    background: "#0B0F19",
    sidebarBackground: "#070A12",
    cardBackground: "#1E293B",
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
    border: "#1E293B",
    accent: "#FDB913",
    accentText: "#0A2540",
    modalBackground: "rgba(0, 0, 0, 0.9)",
    modalContent: "#0F172A",
  },
  light: {
    background: "#F4F6F8",
    sidebarBackground: "#FFFFFF",
    cardBackground: "#FFFFFF",
    textPrimary: "#0A2540",
    textSecondary: "#4A5568",
    border: "#E2E8F0",
    accent: "#004B87",
    accentText: "#FFFFFF",
    modalBackground: "rgba(10, 37, 64, 0.7)",
    modalContent: "#FFFFFF",
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const colors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme mora biti korišten unutar ThemeProvider-a");
  }
  return context;
};
