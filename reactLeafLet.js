import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
const MarkerMap = () => {

  const [initialPosition, setInitialPosition] = useState([37.87227246765076, 32.49213621350339]);
  const [markers, setMarkers] = useState([])
  console.log(markers)
  const Markers = () => {

    const map = useMapEvents({
      click(e) {
        setMarkers(current => [...current, { x: e?.latlng?.lat, y: e?.latlng?.lng }]); 
      },
    })

    const handleMarkerClick = e => {
      markers.map((item, index) => {
        if (item?.x == e.latlng.lat && item?.y == e.latlng.lng) { 
          const newPositions = [...markers];
          newPositions.splice(index, 1);
          return setMarkers(newPositions); }
        }
      )
    }

    return (
      markers.length > 0 ?
        markers.map((item, index) => {
          return <>
            < Marker
              key={index}
              position={[item?.x, item?.y]}
              interactive={true}
              eventHandlers={{ click: handleMarkerClick }}
            />
          </> }
        )
        : null
    )
  }

  return (
    <MapContainer
      center={initialPosition}
      zoom={12}
      style={{ height: '400px', width: '100%' }}
    >
      <Markers />
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default MarkerMap;