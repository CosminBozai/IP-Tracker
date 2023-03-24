import * as leaflet from "leaflet";
import markerIcon from "../images/icon-location.svg";

const map = leaflet.map("map", { zoomControl: false });
const myIcon = leaflet.icon({
  iconUrl: markerIcon,
  iconSize: [46, 56],
});

let previousMarker: L.Marker | null = null;

const setMarker = async (latitude: number, longitude: number) => {
  if (previousMarker) {
    map.removeLayer(previousMarker);
  }

  map.setView([latitude, longitude], 12);
  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  const currentMarker = leaflet
    .marker([latitude, longitude], { icon: myIcon })
    .addTo(map);

  previousMarker = currentMarker;
};

export default setMarker;
