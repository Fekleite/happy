import Leaflet from 'leaflet';

import mapMarkerImg from '../assets/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [180, 4]
})

export default mapIcon;