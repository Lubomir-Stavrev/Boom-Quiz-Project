import styles from "../styles/Home.module.scss";
import { useState, useEffect, Router } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import services from "../utils/services.js";
import Timer from "./timer.js";
import Prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import { useRouter } from "next/router";

export default function Home() {
	const [getSlideUpValue, setSlideUpValue] = useState("150");
	const [getQuizData, setQuizData] = useState();
	const [currentQuestionIndex, setQuestionIndex] = useState(0);
	const [currentPoints, setPoints] = useState(0);
	const router = useRouter();
	useEffect(() => {
		async function setDataState() {
			let data = await services.getQuiz();
			setQuizData(Object.entries(data));
		}

		setDataState();
	}, []);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setTimeout(Prism.highlightAll, 2000);
		}
	}, []);

	function answerTheQuestion(e) {
		let answer = e.target.getAttribute("data-index");
		if (!answer) {
			answer = e.target.parentNode.getAttribute("data-index");
		}

		if (answer === getQuizData[currentQuestionIndex][1].rightAnswer) {
			setPoints((prev) => {
				return prev + 1;
			});
		}
		setSlideUpValue("0");
		if (currentQuestionIndex + 1 >= getQuizData?.length) {
			setPoints((prev) => {
				console.log(prev);
				router.push(`/results/${prev}`);
				return prev;
			});
			console.log("asdasdasdasdasd");
			return;
		}
		setTimeout(() => {
			setQuestionIndex((prev) => {
				setTimeout(() => {
					setSlideUpValue("650px");
				}, 500);

				return prev + 1;
			});
		}, 500);
	}

	function handleTimeLeft(e) {
		setQuestionIndex((prev) => {
			if (prev + 1 >= getQuizData?.length) {
				setPoints((prevPoint) => {
					router.push(`/results/${prevPoint}`);
					return prevPoint;
				});
				return prev;
			} else {
				return prev + 1;
			}
		});
	}
	return (
		<div className={styles.wrapper}>
			{getQuizData ? (
				<>
					<Head>
						<title>Quiz</title>
						<meta
							name="description"
							content="Generated by create next app"
						/>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<main className={styles.main}>
						<motion.div
							animate={{
								y: -60,
								opacity: 1
							}}
							initial={{ opacity: 0.5, y: 50 }}
							transition={{
								type: "spring",
								stiffness: 170
							}}
							className={styles.quizContainer}>
							<Timer
								onTimeLeft={(e) => handleTimeLeft(e)}
								props={currentQuestionIndex}></Timer>

							<motion.div
								className={styles.innerContainer}
								style={{ maxHeight: getSlideUpValue }}
								animate={{
									y: -15
								}}
								transition={{
									type: "spring",
									stiffness: 100,
									delay: 0
								}}
								initial={{ y: 60 }}>
								<div className={styles.quizTitle}>
									{getQuizData[currentQuestionIndex]?.length
										? getQuizData[currentQuestionIndex][1]
												?.Question
										: ""}
								</div>
								{getQuizData[currentQuestionIndex]?.length ? (
									getQuizData[currentQuestionIndex][1]
										?.codeQuestion ? (
										<div
											style={{
												width: "80%",
												overflowX: "scroll"
											}}
											className={
												styles.quizQuestionContainer
											}>
											<pre>
												<code className="language-javascript">
													{
														getQuizData[
															currentQuestionIndex
														][1]?.codeQuestion
													}
												</code>
											</pre>
										</div>
									) : null
								) : null}

								<div className={styles.quizAnswers}>
									{getQuizData
										? Object.entries(
												getQuizData[
													currentQuestionIndex
												][1]?.answers
										  ).map((el) => {
												return (
													<div
														key={el[0]}
														data-index={el[0]}
														className={
															styles.answer
														}
														onClick={(e) =>
															answerTheQuestion(e)
														}>
														<div data-index={el[0]}>
															<span>{el[0]}</span>
														</div>

														{getQuizData[
															currentQuestionIndex
														][1]?.type == "code" ? (
															<pre
																style={{
																	overflowX:
																		"scroll",
																	width: "90%"
																}}
																data-index={
																	el[0]
																}>
																<code className="language-javascript">
																	{el[1]}
																</code>
															</pre>
														) : (
															<h4>{el[1]}</h4>
														)}
													</div>
												);
										  })
										: null}
								</div>
							</motion.div>
						</motion.div>
						{Prism.highlightAll()}
					</main>
				</>
			) : null}
		</div>
	);
}
