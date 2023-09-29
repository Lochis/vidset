import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';

function Dashboard({user}) {
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:8000/message")
          .then((res) => res.json())
          .then((data) => setMessage(data.message));
          }, []);

    return(
        <Container>
            <h1>{message}</h1>
            {user ? (
                <h1>Authenticated as: {user.displayName}</h1>
            ) : (
                <h1>Not Authenticated</h1> 
            )}
        </Container>
    );
}

export default Dashboard;