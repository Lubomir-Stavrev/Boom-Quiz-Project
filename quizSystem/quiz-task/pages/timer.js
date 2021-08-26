import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.scss";

export default function Timer({ props, onTimeLeft }) {
	const [timerCountValue, setTimerCountValue] = useState(0);

	useEffect(() => {
		setInterval(() => {
			changeProgress();
		}, 50);

		return () => clearInterval();
	}, []);

	useEffect(() => {
		console.log(props);
		console.log(onTimeLeft);
		setTimeout(() => {
			setTimerCountValue(0);
		}, 900);
	}, [props]);

	function changeProgress() {
		setTimerCountValue((prev) => {
			if (prev <= -730) {
				onTimeLeft(true);
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
