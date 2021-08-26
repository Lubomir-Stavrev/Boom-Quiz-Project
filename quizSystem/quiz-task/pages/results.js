import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<div className={styles.wrapper}>
			<main className={styles.main}>
				<motion.div
					animate={{
						y: -70,
						opacity: 1
					}}
					initial={{ opacity: 0.5, y: 50 }}
					transition={{
						type: "spring",
						stiffness: 170
					}}
					className={styles.resultContainer}>
					<h2>YOUR SCORE IS</h2>
					<h1>3/6</h1>
					<button>Do it again</button>
				</motion.div>
			</main>
		</div>
	);
}
