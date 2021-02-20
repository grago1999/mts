import React, { useState, useEffect } from "react"
import "./questionManager.css"

function QuestionManager() {
	const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)

	const submit = () => {
		const input = (document.getElementById("question") as HTMLInputElement)
		const question = input.value
		input.value = ""
	}

	const getCurrentQuestion = () => {
		// fetch("http://localhost:1000")
		// .then(response => response.json())
		// .then(question => setCurrentQuestion(question))
		setCurrentQuestion("get from api")
	}

	useEffect(() => getCurrentQuestion(), [currentQuestion])

	return (
		<div id="questions">
			<input id="question" placeholder="Next Question" className="input" />
			<button id="submit" className="submit" onClick={submit}>{"Start Round"}</button>
			Current Quesiton: {currentQuestion}
		</div>
	)
}

export default QuestionManager
