import "@/scss/globals.css";
import "@/scss/index.scss";
import type { AppProps } from "next/app";
import { ThemeContextProvider} from "@/provider/ThemeContext";
import { Source_Sans_3, Roboto_Mono } from "next/font/google";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

// Define MainApp as a separate component to use hooks
const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
	return (
		<>
			{/* Global font variables */}
			<style jsx global>{`
        :root {
          --raleway: ${sourceSans.style.fontFamily};
          --fira-code: ${robotoMono.style.fontFamily};
        }
      `}</style>

			<div>
        {children}
			</div>
		</>
	);
};

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<ThemeContextProvider>
      <MainLayout>
        <Component {...pageProps} key={router.asPath} />
      </MainLayout>
		</ThemeContextProvider>
	);
}

export default MyApp;
