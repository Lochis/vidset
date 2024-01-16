import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";

function Home() {
    const [message, setMessage] = useState("");
    
    /*useEffect(() => {
        fetch("http://localhost:8000/message")
          .then((res) => res.json())
          .then((data) => setMessage(data.message));
          }, []);
    */

  return(
    <div className="lg:container mx-auto flex w-full flex-wrap items-center justify-between px-3 py-3">
      <h1 class="mx-auto mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        Welcome to <span class="text-green-400">Vidset</span>
      </h1>
      <p class="mb-6 mx-auto text-lg font-normal lg:text-2xl sm:px-16 xl:px-48">
        Your new tool to see all of your <span class="text-purple-400">analytics</span> from your <span class="text-purple-400">social media</span> platforms in <span class="text-purple-400">one</span> place
      </p>
    </div>
    );
}

export default Home;
