import React from 'react'

import './App.css'

export default class App extends React.Component{
    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)

        this.updateQuestion = this.updateQuestion.bind(this)

        this.state = {
            hasSubmittedAnswer: false,
            answer: null,
            question: null
        }
    }

    componentDidMount() {
        this.updateQuestion()
        setInterval(() => this.updateQuestion(), 2000)
    }

    updateQuestion() {
        fetch("http://localhost:7000/answers/checkactive")
        .then(response => response.text())
        .then(response => {
            const question = JSON.parse(response).question
            this.setState({ question })
        })
    }

    submit() {
        const answer = document.getElementById("answer").value
        if (!answer) {
            return
        }

        fetch("http://localhost:7000/answers/submitAnswerNew", {
            method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
            body: JSON.stringify({
                basic_ans: {
					answer
				}
            })
        })
        .then(() => this.setState({ hasSubmittedAnswer: true, answer }))
        .catch(() => this.setState({ hasSubmittedAnswer: true, answer }))
    }
    
    render() {
        const { hasSubmittedAnswer, answer, question } = this.state

        return (
            <div className="App">
                {question && <h2 id="question" className="question">{question}</h2>}
                {!hasSubmittedAnswer &&
                    <div id="container" className="container">
                        <input id="answer" placeholder="Your answer" className="answer" />
                        <button id="submit" onClick={this.submit} className="submit">Submit</button>
                    </div>
                }
                {hasSubmittedAnswer &&
                    <div id="thanks" className="thanks">
                        <p>Thanks for submitting an answer:</p>
                        <p className="bold">{answer}</p>
                    </div>
                }
            </div>
        )
    }
}