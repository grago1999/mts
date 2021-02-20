import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import GroupList from "./components/GroupList"
import AdminGroupList from "./components/AdminGroupList"
import QuestionManager from "./components/QuestionManager"

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
  const [tab, setTab] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        {tab === 0 && <PlayTab />}
        {tab === 1 && <AdminTab />}
        <div id="tabs" className="tabs">
          <button onClick={() => setTab(0)}>Play</button>
          <button onClick={() => setTab(1)}>Admin</button>
        </div>
      </header>
    </div>
  );
}

export default App;
