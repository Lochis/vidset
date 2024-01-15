import React, {useState, useEffect} from "react";
/*import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';*/
import Button from 'react-bootstrap/Button';
import pic from '../pictures/picWebm.gif';
import newVid from '../pictures/new-vid.png';
import '../App.css';


function Schedule({user}) {

   const renderListOfUserNames = (names) => {
    return names.map(name => <li>{name}</li>)
  }

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/schedule", {
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


const numbers = [1, 2, 3, 4, 5, 6];
const cardWidth = '14vw';
const aspectRatio = 9/16;

const displayCards = (cells) =>{
  console.log(cells);
  return (
         cells.map((cell, index)=>(
           <div className="flex-cell">
           <Card className="mx-2 bg-dark text-white p-0" key={`cell-${index}`} style={{ minWidth: '200px', minHeight: '355.56px', width: cardWidth ,height: `calc(${cardWidth} * ${1 / aspectRatio})` }}>
               <Card.Img variant="top" src={pic} style={{objectFit: 'cover', width: '100%', height: '100%', margin: 0, padding: 0}} />
               <Card.ImgOverlay>
                 <Card.Body className="p-0">
                   <Card.Title>9/16 Preview</Card.Title>
                   <Card.Text>
                     Cell-{index}
                   </Card.Text>
                 </Card.Body>
               </Card.ImgOverlay>
             </Card>
           </div>
         ))
        );
};

    return(
        <Container fluid="md">
            {user ? (
                <div>
                  <h5>Authenticated as: {user.displayName}</h5>
                  <div className="flex-container">
                    <div className="flex-cell">
                      <Card className="mx-2 bg-dark text-white p-0" key={`cell-add`} style={{ minWidth: '200px', minHeight: '355.56px', width: cardWidth ,height: `calc(${cardWidth} * ${1 / aspectRatio})` }}>
                        <Card.Img variant="top" src={newVid} style={{objectFit: 'cover', width: '100%', height: '100%', margin: 0, padding: 0}} />
                        <Card.ImgOverlay>

                        </Card.ImgOverlay>
                      </Card>
                    </div>

                    {displayCards(numbers)}
                  </div>
                  </div>
            ) : (
                <h1>Not Authenticated</h1>
            )}
        </Container>
    );
}

export default Schedule;
