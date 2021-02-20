import React from 'react'

import './App.css'

export default class App extends React.Component{
    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)

        this.state = {
            hasSubmittedAnswer: false,
            answer: null
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    submit() {
        const answer = document.getElementById("answer").value
        if (!answer) {
            return
        }

        fetch("http://localhost:1000/submitAnswer", {
            method: "POST",
            body: {
                answer
            }
        })
        .then(() => this.setState({ hasSubmittedAnswer: true, answer }))
        .catch(() => this.setState({ hasSubmittedAnswer: true, answer }))
    }
    
    render() {
        const { hasSubmittedAnswer, answer } = this.state

        return (
            <div className="App">
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