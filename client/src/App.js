import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar';
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
  fetch("http://localhost:8000/auth/profile")
      .then((res) => res.json())
      .then((data) => {
        if(data.isAuthenticated) {
          setAuth(true);
          setUsername(data.username);
        } else {
          setAuth(false);
          setUsername('');
        }
      }).catch((error) => console.log(error));

    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
      }, []);


  return (
    <div className="App">
      <NavBar isAuthenticated={auth} username={username}/>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
