import React, { useState, useEffect } from "react"
import "./questionManager.css"

function QuestionManager() {
	const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)

	const submit = () => {
		const input = (document.getElementById("question") as HTMLInputElement)
		const question = input.value
		input.value = ""
		fetch("http://localhost:7000/answers/start", {
            method: "POST",
            headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
            body: JSON.stringify({
                round: {
					question,
					active: true
				}
            })
        })
		.then(response => response.text())
		.then(question => setCurrentQuestion(question))
	}

	const stop = () => {
		fetch("http://localhost:7000/answers/stop")
		.then(() => setCurrentQuestion(""))
	}

	return (
		<div id="questions">
		{currentQuestion && <p>Current Quesiton: {currentQuestion}</p>}
			{!currentQuestion && <input id="question" placeholder="Next Question" className="input" />}
			<div id="buttons" className="buttons">
				{!currentQuestion && <button id="submit" className="button" onClick={submit}>{"Start Round"}</button>}
				{currentQuestion && <button id="stop" className="button" onClick={stop}>{"Stop Round"}</button>}
			</div>
		</div>
	)
}

export default QuestionManager
