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
  return (
    <div id="play" className="tab">
      <h1>Question: What is the best gaming platform?</h1>
      <GroupList />
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
          <button onClick={() => setTab(Tabs.Play)}>Play</button>
          <button onClick={() => setTab(Tabs.Admin)}>Admin</button>
        </div>
      </header>
    </div>
  );
}

export default App;
