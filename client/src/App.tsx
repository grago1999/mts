import React, { useState, useEffect } from "react";
import './App.css';

import GroupList from "./components/GroupList"
import AdminGroupList from "./components/AdminGroupList"
import QuestionManager from "./components/QuestionManager"

enum Tabs {
  Admin,
  Play
}

const PlayTab = () => {
  const [question, setQuestion] = useState("")

  const updateQuestion = () => {
    fetch("http://localhost:7000/answers/checkactive")
      .then(response => response.json())
      .then(response => {
          setQuestion(response.question)
          setTimeout(() => updateQuestion(), 2000)
      })
  }

  useEffect(() => updateQuestion(), [])

  return (
    <div id="play" className="tab">
      {question && <h1 className = "Q">Question: {question}</h1>}
      {!question && <h1 className = "Q">Waiting...</h1>}
      {question && <GroupList />}
    </div>
  )
}

const AdminTab = () => {
  return <div id="admin" className="tab">
    <AdminGroupList />
    <QuestionManager />
  </div>
}

function App() {
  const [tab, setTab] = useState(Tabs.Play)

  return (
    <div className="App">
      <header className="App-header">
        {tab === Tabs.Play && <PlayTab />}
        {tab === Tabs.Admin && <AdminTab />}
        <div id="tabs" className="tabs">
          <button className = "NavButton" onClick={() => setTab(Tabs.Play)}>Host</button>
          <button className = "NavButton" onClick={() => setTab(Tabs.Admin)}>Admin</button>
        </div>
      </header>
    </div>
  );
}

export default App;
