import styles from "../../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
	const [getPoints, setPoints] = useState(0);
	useEffect(() => {
		let points = window.location.href.split("/")[4];
		setPoints(points);
	}, []);
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
					<main>
						<div>
							<h1>SCORE</h1>
							<h1>{getPoints}/6</h1>
						</div>
						<button onClick={(e) => (window.location.href = "/")}>
							<span>Try Again</span>
						</button>
					</main>
				</motion.div>
			</main>
		</div>
	);
}
