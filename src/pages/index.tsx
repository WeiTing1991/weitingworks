import CustomParticles from "@/components/CustomParticles";
import BackHome from "@/components/BackHome";
import Loader from "@/components/Loader";
import SocialIcons from "@/components/SocialIcons";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Navbar from "@/sections/Navbar";
import Head from "next/head";
import { useState } from "react";


function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [showContent, setShowContent] = useState(false);

	const handleLoaderLoaded = () => {
		setIsLoading(false);
		setTimeout(() => setShowContent(true), 450);
	};

	return (
		<div className="app">
			<Head>
				<title>WEITING CHEN</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			{showContent && (
				<>
					<Navbar />
					<SocialIcons />
					<BackHome />
					<main>
						{/* <CustomParticles /> */}
						<Hero />
						<About />
						<Experience />
						<Contact />
					</main>
					{/* <Footer /> */}
				</>
			)}
			<Loader isLoading={isLoading} setIsLoading={handleLoaderLoaded} />
		</div>
	);
}

export default Home;
