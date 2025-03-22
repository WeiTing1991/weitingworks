import "@/scss/globals.css";
import "@/scss/index.scss";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "@/provider/ThemeContext";
import { Source_Sans_3, Roboto_Mono } from "next/font/google";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

// Separate component to use useTheme hook (hooks can't be used directly in _app)
const MainApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	const { theme } = useTheme();

	return (
		<>
			{/* Global font variables */}
			<style jsx global>{`
        :root {
          --raleway: ${sourceSans.style.fontFamily};
          --fira-code: ${robotoMono.style.fontFamily};
        }
      `}</style>

			<div data-theme={theme}>
				<Component {...pageProps} />
			</div>
		</>
	);
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<MainApp Component={Component} pageProps={pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
