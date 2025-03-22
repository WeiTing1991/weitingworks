import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Hero() {
	return (
		<div className="hero">
			<motion.h1
				className="hero-title"
				initial={{ opacity: 0, y: 5 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
					delay: 0.6,
				}}
			>
				Hi there, I&apos;m
			</motion.h1>
			<motion.h2
				className="hero-title-large"
				initial={{ opacity: 0, y: 5 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
					delay: 0.75,
				}}
			>
				WeiTing.
			</motion.h2>
			<motion.h3
				className="hero-title-large hero-title-sub"
				initial={{ opacity: 0, y: 5 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
					delay: 1.05,
				}}
			></motion.h3>
			<motion.p
				className="hero-text"
				initial={{ opacity: 0, y: 5 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
					delay: 1.35,
				}}
			>
				I am a Software Developer with diverse experience in robotics,
				architecture, and automation. I am passionate about exploring emerging
				technologies and designing innovative, impactful solutions.
			</motion.p>

			{/* <motion.div
        className="hero-button"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 1.65,
        }}
      >
        <Button
          text="Check out my works"
          link="/work"
        />
      </motion.div> */}
		</div>
	);
}

export default Hero;
