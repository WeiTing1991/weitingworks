import React from "react";
import { motion } from "framer-motion";
import { CiHome } from "react-icons/ci";
import Link from "next/link";

function Email() {
	return (
		<motion.div
			className="email"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.3,
				ease: "easeInOut",
				delay: 1.95,
			}}
		>
			<Link className="email-link" href="/">
				<CiHome />
			</Link>
		</motion.div>
	);
}

export default Email;
