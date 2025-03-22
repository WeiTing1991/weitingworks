import CustomParticles from "@/components/CustomParticles";
import BackHome from "@/components/BackHome";
import Loader from "@/components/Loader";
import SocialIcons from "@/components/SocialIcons";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Navbar from "@/sections/Navbar";
import Projects from "@/sections/Projects";
import Head from "next/head";
import { useState } from "react";

function ProjectHome() {
	return (
		<div className="project">
			<Head>
				<title>WEITING CHEN</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<>
				<Navbar />
				<SocialIcons />
				<BackHome />
				<main>
					<Projects />
				</main>
			</>
		</div>
	);
}

export default ProjectHome;
