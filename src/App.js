import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { useState } from 'react';
import NoteState from './context/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [mode, setMode] = useState("dark");
  const onClickSwitch = () => {
    if (mode === 'white') setMode('dark');
    else setMode('white');
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iNotebook" mode={mode} onClickSwitch={onClickSwitch} />
          {/* <Alert message="this is alert"/> */}
          <div className='container' >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>   
    </>
  );
}

export default App;
