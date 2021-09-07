import styles from "../../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
	const [getPoints, setPoints] = useState(0);
	const router = useRouter();
	let intervalID = 0;

	useEffect(() => {
		let points = window.location.href.split("/")[4];

		intervalID = setInterval(() => {
			setPoints((prev) => {
				console.log(prev);
				if (prev + 1 <= points) {
					return prev + 1;
				}

				clearInterval(intervalID);
				return prev;
			});
		}, 250);
	}, []);

	function goHome(e) {
		setTimeout(() => {
			router.push(`/`);
		}, 800);
	}

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
						<div className={styles.scoreContainer}>
							<h1>SCORE: </h1>
							<div className={styles.score}>
								<h1>{getPoints}/6</h1>
							</div>
						</div>
						<div
							className={styles.container}
							onClick={(e) => goHome(e)}>
							<div className={styles.center}>
								<button className={styles.btn}>
									<svg
										width="180px"
										height="60px"
										viewBox="0 0 180 60"
										className={styles.border}>
										<polyline
											points="179,1 179,59 1,59 1,1 179,1"
											className={styles.bgLine}
										/>
										<polyline
											points="179,1 179,59 1,59 1,1 179,1"
											className={styles.hlLine}
										/>
									</svg>
									<span>TRY AGAIN</span>
								</button>
							</div>
						</div>
					</main>
				</motion.div>
			</main>
		</div>
	);
}
