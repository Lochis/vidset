import React, {useState, useEffect} from "react";
/*import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';*/
import {Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import pic from '../pictures/picWebm.gif';
import newVid from '../pictures/new-vid.png';
import '../App.css';


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

  let tabs = [
    {
    id: "youtube",
    label: "Youtube",
    content: {
      views: "100",
      subscribers: "22",
      watch_hours: "83",
        },
    },
    {
    id: "snapchat",
    label: "Snapchat",
    content: {
      views: "200",
      subscribers: "92",
      watch_hours: "32",
        },
    },
  ]

    return(
        <div className="container mx-auto justify-between px-3 py-3">
            {user ? (
              <Tabs aria-label="Social Media Tabs" items={tabs}>
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  <div className="flex w-full flex-row space-x-6">
                    <Card className="w-full h-40">
                      <CardBody>
                        <p class="mb-6 text-lg font-bold lg:text-2xl">
                        Views
                        </p>
                        {item.content.views}
                      </CardBody>
                    </Card>
                    <Card className="w-full h-40">
                      <CardBody>
                        <p class="mb-6 text-lg font-bold lg:text-2xl">
                        Subscribers
                        </p>
                        {item.content.subscribers}
                </CardBody>
                    </Card>
                  </div>
                </Tab>
              )}
              </Tabs>
            ) : (
                <h1>Not Authenticated</h1>
            )}
        </div>
    );
}

export default Dashboard;
