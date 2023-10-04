import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Dashboard({user}) {

   const renderListOfUserNames = (names) => {
    return names.map(name => <li>{name}</li>)
  }

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/dashboard", {
        method:"GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
          .then((res) => res.json())
          .then((data) => setMessage(data.message));
          }, []);

    const numbers = [1, 2, 3];
const displayCards = (nums) =>{
    return nums.map(num =>
        <Card style={{ width: '18rem', height: '18rem'}}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      {num}
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
    );
}


    return(
        <Container>
            {user ? (
                <div>
                  <h3>Authenticated as: {user.displayName}</h3>
                  <ul>
                    {displayCards(numbers)}
                  </ul>
                </div>
            ) : (
                <h1>Not Authenticated</h1> 
            )}
        </Container>
    );
}

export default Dashboard;
