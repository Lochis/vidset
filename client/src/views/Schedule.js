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
             <Image
        alt="Woman listing to music"
        className="object-cover w-full h-full z-0"
        src={pic}
      />
             </Card>
           </div>
         ))
        );
};

    return(
        <div className="lg:container mx-auto flex w-full flex-wrap items-center justify-between px-3 py-3">
            {user ? (
                <div>
                  <div className="flex-container">
                    <div className="flex-cell">
                      <Card className="mx-2 bg-dark text-white p-0" key={`cell-add`} style={{ minWidth: '200px', minHeight: '355.56px', width: cardWidth ,height: `calc(${cardWidth} * ${1 / aspectRatio})` }}>

                      </Card>
                    </div>

                    {displayCards(numbers)}
                  </div>
                  </div>
            ) : (
                <h1>Not Authenticated</h1>
            )}
        </div>
    );
}
export default Schedule;
