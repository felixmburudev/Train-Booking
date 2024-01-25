import {  useEffect, useState } from "react";
import TrainList from "../trainList/trainList";
import "./stations.css";
import axios from "axios";

const Stations = () => {
const [nextTrains, setNextTrains] = useState([]);
const [errorTrain, setErrorTrain] = useState(null);
const getNextTrain = async () =>{
  try {
      const response = await axios("http://localhost:3000/nextTrain");
      setNextTrains(response.data.data);
  }
  catch(error){
    // console.log(nextTrains)
    setErrorTrain("Error Getting The Next Train Schedules ");
  }
}

useEffect(()=>{
  getNextTrain();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <>
    <div className="sta">
    <h1>Upcoming Trains{errorTrain}</h1>
    {/* {!errorTrain && ( */}
    <span className="trainsError">{errorTrain && <p>{errorTrain}</p>}</span>
      
    
      
    <TrainList trains={nextTrains} />
  </div>
    {/* )} */}
    </>
  )
}

export default Stations