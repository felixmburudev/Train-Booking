import {  useEffect, useState } from "react";
import TrainList from "../components/trainList";
import "../styles/stations.css";
import axios from "axios";

const Stations = () => {
const [nextTrains, setNextTrains] = useState([]);
const [errorTrain, setErrorTrain] = useState(null);
const getNextTrain = async () => {
  try {
    const response = await axios.get("http://localhost:3000/nextTrain");
    
      setNextTrains(response.data.data);
  } catch (error) {
    setErrorTrain("Error Getting The Next Train Schedules ");
  }
};

useEffect(()=>{
  getNextTrain();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <>
    <div className="sta">
    <h1>Upcoming Trains</h1>
    {/* {!errorTrain && ( */}
    <span className="trainsError">{errorTrain && <p>{errorTrain}</p>}</span>
      
    
      
    <TrainList trains={nextTrains} />
  </div>
    {/* )} */}
    </>
  )
}

export default Stations