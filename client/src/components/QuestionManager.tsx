import React, { useState, useEffect } from "react"
import "./questionManager.css"

function QuestionManager() {
	const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)

	const submit = () => {
		const input = (document.getElementById("question") as HTMLInputElement)
		const question = input.value
		input.value = ""
	}

	const stop = () => {

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
			<div id="buttons" className="buttons">
				{!currentQuestion && <button id="submit" className="button" onClick={submit}>{"Start Round"}</button>}
				{currentQuestion && <button id="stop" className="button" onClick={stop}>{"Stop Round"}</button>}
			</div>
			<p>Current Quesiton: {currentQuestion}</p>
		</div>
	)
}

export default QuestionManager
