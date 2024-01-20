import "./turminus.css";

const Turminus = () => {
  const stations = [
    {
      name: 'Station A',
      image: '/img/turminus1.jpg',
      description: 'Station A is a major railway station known for its historical significance and modern amenities.',
    },
    {
      name: 'Station B',
      image: '/img/turminus2.jpg', 
      description: 'Station B is a bustling railway hub in the heart of the city, connecting travelers to various destinations.',
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
