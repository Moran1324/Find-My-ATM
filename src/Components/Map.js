import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import useAtmApi from '../Hooks/useAtmApi';

const useStyles = makeStyles({
  mapContainer: {
    height: '100vh',
  },
});

// const israelLocation = {
//   lat: 31.4826581,
//   lng: 34.8673620,
// };

const redIcon = new Icon({
  iconUrl: '/red-map-marker.png',
  iconSize: [36, 36],
});

const blueIcon = new Icon({
  iconUrl: '/blue-map-marker.png',
  iconSize: [36, 36],
});

function Map() {
  const {
    searchResults, atmTypes, mapZoom, mapCenter,
  } = useAtmApi();

  const classes = useStyles();

  return (
    <MapContainer
      className={classes.mapContainer}
      center={mapCenter}
      zoom={mapZoom}
      // scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {searchResults.map((result) => (
        <Marker
          icon={result.ATM_Type === atmTypes[0]
            ? blueIcon
            : redIcon}
          key={result._id}
          position={{ lat: result.X_Coordinate, lng: result.Y_Coordinate }}
        >
          <Popup>
            {result.ATM_Location}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default Map;
