import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/provider/ThemeContext";

const ThemedIcon: React.FC = () => {
	const { theme } = useTheme();
	const Icon = theme === "light" ? FaSun : FaMoon;

	return (
		<Icon
			style={{
				color: `var(--theme-color)`,
				fontSize: "24px",
			}}
		/>
	);
};

export default ThemedIcon;
