import "./style.scss";
import * as leaflet from "leaflet";
import * as API from "./api.json";
import markerIcon from "./images/icon-location.svg";
import axios from "axios";

const getIPLocation = async () => {
  const res = await axios.get(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API.key}`
  );

  const { lat, lng } = res.data.location;
  console.log("🚀 ~ file: main.ts:21 ~ getIPLocation ~ lng:", lng);
  console.log("🚀 ~ file: main.ts:21 ~ getIPLocation ~ lat:", lat);

  return { lat, lng };
};

const setMarker = async () => {
  // const { lat, lng } = await getIPLocation();
  const lat = 45;
  const lng = 20;

  var map = leaflet.map("map", { zoomControl: false }).setView([lat, lng], 7);
  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  var myIcon = leaflet.icon({
    iconUrl: markerIcon,
    iconSize: [46, 56],
  });

  leaflet.marker([lat, lng], { icon: myIcon }).addTo(map);
};

setMarker();
