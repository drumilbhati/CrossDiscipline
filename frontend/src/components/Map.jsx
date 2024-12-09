import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DebugComponent = () => {
  const map = useMap();
  console.log('Map object:', map);
  return null;
};

const GTA5EpsilonMap = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width: '100%', height: '100vh' });

  const mapBounds = [[0, 0], [1000, 1000]];
  const mapCenter = [500, 500];

  const epsilonLocations = [
    { position: [350, 650], name: "Epsilon Building" },
    { position: [450, 400], name: "Epsilon Robes Location" },
    { position: [600, 550], name: "Epsilon Car Delivery Point" },
    { position: [200, 300], name: "Epsilon Desert Camp" },
    { position: [700, 700], name: "Kifflom! Tract Location" }
  ];

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = (error) => setError('Failed to load image');
    img.src = "https://i.redd.it/8qfr3xqfbw671.jpg";

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({
        width: width > 768 ? '100%' : '100%',
        height: width > 768 ? '100vh' : '50vh'
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!imageLoaded) {
    return <div>Loading map image...</div>;
  }

  return (
    <div className="map-container" style={{ 
      display: 'flex', 
      flexDirection: window.innerWidth > 768 ? 'row' : 'column',
      width: '100%',
      height: '100vh',
      justifyContent: 'center', 
      overflow: 'hidden' }}>
      <div style={{ width: window.innerWidth > 768 ? '60%' : '100%', height: dimensions.height, overflow: 'hidden'}}>
        <MapContainer 
          center={mapCenter} 
          zoom={0} 
          crs={L.CRS.Simple}
          style={{ height: '100%', width: '100%' }}
          bounds={mapBounds}
          boundsOptions={{ padding: [100, 100] }}
          maxBounds={mapBounds}
          maxBoundsViscosity={1}
        >
          <DebugComponent />
          <ImageOverlay
            url="https://i.redd.it/8qfr3xqfbw671.jpg"
            bounds={mapBounds}
          />
          {epsilonLocations.map((location, index) => (
            <Marker style={{color: '#ffab00'}} key={index} position={location.position}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default GTA5EpsilonMap;