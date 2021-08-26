const db =
	"https://boom-quiz-system-default-rtdb.europe-west1.firebasedatabase.app/";

export default {
	getQuiz() {
		return fetch(db + ".json")
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			})
			.then((data) => {
				return data;
			});
	}
};
