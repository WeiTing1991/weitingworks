import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Loader({ isLoading, setIsLoading }: any) {
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading();
		}, 1900);
		return () => clearTimeout(timer);
	}, [setIsLoading]);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					className="loader"
					exit={{ scale: 0 }}
					key="motiondivleave"
					transition={{
						duration: 0.45,
						ease: "easeInOut",
					}}
				>
					<motion.svg
						width="100"
						height="100"
						viewBox="0 0 100 100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Logo</title>
						<motion.circle
							cx="50"
							cy="50"
							r="20"
							fill="none"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{
								pathLength: 1,
								opacity: 1,
								rotate: 360,
							}}
							transition={{
								duration: 1.5,
								ease: "easeInOut",
								repeat: Infinity,
								rotate: {
									duration: 2,
									repeat: Infinity,
									ease: "linear",
								},
							}}
							exit={{
								scale: 2,
								opacity: 0,
							}}
						/>
					</motion.svg>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default Loader;
