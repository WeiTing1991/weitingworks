import { ThemeContextProvider } from "@/provider/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto_Mono, Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${sourceSans.style.fontFamily};
          --font-mono: ${robotoMono.style.fontFamily};
        }
      `}</style>
      <div>{children}</div>
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
