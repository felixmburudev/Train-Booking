/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

// Create context
const TrainStateContext = createContext();

export const TrainStateProvider = ({ children, trainName }) => {
  const [trainState, setTrainState] = useState({ trainName: '', remainingSeats: 0 });

 
  const updateRemainingSeats = (newTrainState) => {
    setTrainState(newTrainState);
  };

  useEffect(() => {
    const socket = new WebSocket('http://localhost:3000');

    socket.onmessage = (event) => {
      const newTrainState = JSON.parse(event.data);
      updateRemainingSeats(newTrainState);
    };

    socket.send(JSON.stringify({ trainName }));
    return () => {
      socket.close();
    };
  }, [trainName]); 

  return (
    <TrainStateContext.Provider value={{ trainState, updateRemainingSeats }}>
      {children}
    </TrainStateContext.Provider>
  );
};


export const useTrainState = () => {
  return React.useContext(TrainStateContext);
};
