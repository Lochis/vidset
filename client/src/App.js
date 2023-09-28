import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const getUser = ()=>{
      fetch("http://localhost:8000/auth/login/success", {
        method:"GET", 
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
       .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
       })
       .then((resObject) => {
        setUser(resObject.user);
      })
       .catch((err) => {
        console.log(err);
      });
    };
    getUser();
  },[]);

  return (
    <div className="App">
      <NavBar user={user}/>
    </div>
    
  );
}

export default App;
