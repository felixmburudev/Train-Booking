import "../styles/turminus.css";

const Turminus = () => {
  const stations = [
    {
      name: 'Nairobi Station',
      image: '/img/turminus1.jpg',
      description: 'Nairobi Station  is a major railway station known for its historical significance and modern amenities.',
    },
    {
      name: 'Mombasa Station',
      image: '/img/turminus2.jpg', 
      description: 'Mombasa Station is a bustling railway hub in the heart of the city, connecting travelers to various destinations.',
    },
  ];

  return (
    <div className="turminus">
      <h1>Railway Stations</h1>
      <div className="stations">
        
      {stations.map((station, index) => (
        <div key={index} className="station-card">
          <h2>{station.name}</h2>
          <img src={station.image} alt={`Image of ${station.name}`} />
          <p>{station.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Turminus;
