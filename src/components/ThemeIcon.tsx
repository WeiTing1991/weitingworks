import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme, themeOptions, Theme } from "@/provider/ThemeContext";

const ThemedIcon: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const Icon = theme === "light" ? FaSun : FaMoon;

  const handleClick = () => {
    // Toggle to the opposite theme
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme as Theme);
  };

  return (
    <div onClick={handleClick}>
      <Icon
        style={{
          color: `var(--theme-color)`,
          fontSize: "20px",
        }}
      />
    </div>
  );
};

export default ThemedIcon;
