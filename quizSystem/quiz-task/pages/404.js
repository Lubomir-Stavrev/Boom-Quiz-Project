import Link from "next/link";

export default () => {
	return (
		<div style={{ textAlign: "center", margin: "10%" }}>
			<h1>Ooops...</h1>
			<h2>page does not exist</h2>
			<Link href="/">
				<a>Go home</a>
			</Link>
		</div>
	);
};
