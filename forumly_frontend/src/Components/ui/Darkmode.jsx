import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";


export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  // Sync toggle with current theme
  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      // Button Background:
      // Light mode: bg-secondary (neutral/gray)
      // Dark mode: dark:bg-primary (the amber brand color)
      // Text: text-primary-foreground (Text that looks good on the primary/secondary color)
      className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary dark:bg-primary text-primary-foreground hover:scale-110 transition-transform"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        // Sun Icon (when it's dark):
        // text-primary-foreground (The white/light text that is meant to contrast the dark:bg-primary)
        <Sun className="w-5 h-5 text-primary-foreground" />
      ) : (
        // Moon Icon (when it's light):
        // text-primary (The amber color, standing out on the neutral light background)
        <Moon className="w-5 h-5 text-primary" />
      )}
    </button>
  );
}