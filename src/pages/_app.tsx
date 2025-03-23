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

// Define MainApp as a separate component to use hooks
const MainApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
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

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<ThemeProvider>
			<MainApp Component={Component} pageProps={pageProps} router={router} />
		</ThemeProvider>
	);
}

export default MyApp;
