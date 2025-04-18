import React, { createContext, useState, useContext, useEffect } from "react";

export const themeOptions = ["light", "dark", "system"];
export type Theme = (typeof themeOptions)[number];
const DEFAULT_THEME = "dark";

interface ThemeContextType {
  theme: Theme;
  changeTheme: (selectedTheme: Theme) => void;
}

type InitialState = {
  theme: Theme;
  changeTheme: (selectedTheme: Theme) => void;
};

const initialState: InitialState = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    if (theme === "system") {
      document.documentElement.classList.toggle(
        "light",
        !darkModePreference.matches
      );

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("light", !e.matches);
      };
      darkModePreference.addEventListener("change", handleSystemThemeChange);

      return () => {
        darkModePreference.removeEventListener(
          "change",
          handleSystemThemeChange
        );
      };
    }
      document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const value = {
    theme,
    changeTheme: (selectedTheme: Theme) => {
      setTheme(selectedTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default useTheme;
