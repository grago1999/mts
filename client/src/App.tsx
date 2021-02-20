import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import GroupList from "./components/GroupList"

const PlayTab = () => {
  return (
    <div>
      <h1>Question: What is the best gaming platform?</h1>
      <GroupList />
    </div>
  )
}

const AdminTab = () => {
  return <div></div>
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
