import useTheme from "@/provider/ThemeContext";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  const toggle = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="text-[var(--color-subtle)] hover:text-[var(--color-text)] transition-colors font-[family-name:var(--font-mono)] text-sm"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "[dark]" : "[light]"}
    </button>
  );
}
