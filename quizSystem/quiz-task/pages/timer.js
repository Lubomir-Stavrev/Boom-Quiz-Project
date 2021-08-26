import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.scss";

export default function Home() {
	const [timerCountValue, setTimerCountValue] = useState(0);

	useEffect(() => {
		setInterval(() => {
			changeProgress();
		}, 100);

		return () => clearInterval();
	}, []);

	function changeProgress() {
		setTimerCountValue((prev) => {
			if (prev <= -730) {
				//next question func
				return 0;
			}
			return Number(prev) - 1;
		});
	}

	return (
		<div
			style={{
				boxShadow: `inset ${timerCountValue}px 0 0 0 #fefefe`
			}}
			className={styles.quizTimeLine}></div>
	);
}
