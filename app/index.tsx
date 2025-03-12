"use dom";

import {
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import ILocation from "./interfaces/ILocation";
import ISighting from "./interfaces/ISighting";
import IPointOfInterest from "./interfaces/IPointOfInterest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const position: LatLngTuple = [51.505, -0.09];

// interface IPointOfInterest {
//   name: string;
//   location: {
//     latitude: number;
//     longitude: number;
//   };
// }

const POINTS_OF_INTEREST: IPointOfInterest[] = [
  {
    name: "AP Hogeschool",
    location: {
      latitude: 51.2243,
      longitude: 4.3852,
    },
  },
  {
    name: "London Bridge",
    location: {
      latitude: 51.5055,
      longitude: -0.0754,
    },
  },
  {
    name: "Eiffel Tower",
    location: {
      latitude: 48.8584,
      longitude: 2.2945,
    },
  },
  {
    name: "Statue of Liberty",
    location: {
      latitude: 40.6892,
      longitude: -74.0445,
    },
  },
];

let sightings: ISighting[] = [];

interface LocationHandlerProps {
  addMarker: (lat: number, lng: number) => void;
}
const LocationHandler = ({ addMarker }: LocationHandlerProps) => {
  const map = useMapEvents({
    dragend: () => {
      console.log(map.getCenter());
    },
    click: (e) => {
      addMarker(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

const Index = () => {
  const [pointsOfInterest, setPointsOfInterest] =
    useState<ISighting[]>(sightings);
  const [loading, setLoading] = useState<boolean>(true);

  const iconX = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png",
    iconSize: [48, 48],
    popupAnchor: [-3, 0],
  });

  const fetchSightings = async () => {
    try {
      const response = await fetch(
        "https://sampleapis.assimilate.be/ufo/sightings"
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data: ISighting[] = await response.json();
      setPointsOfInterest(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, []);

  const addPointOfInterest = (lat: number, lng: number) => {
    setPointsOfInterest([
      ...pointsOfInterest,
      { name: "New Point", location: { latitude: lat, longitude: lng } },
    ]);
  };

  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={20}
      minZoom={2}
      scrollWheelZoom={true}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      attributionControl={false}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreretmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationHandler addMarker={(lat, lng) => addPointOfInterest(lat, lng)} />
      {pointsOfInterest.map((point, index) => (
        <Marker
          key={index}
          position={[point.location.latitude, point.location.longitude]}
          icon={iconX}
        >
          <Popup>
            <View style={{ backgroundColor: "white", padding: 10, width: 100 }}>
              <Text>
                <a href={"/sightings/" + point.id}>{point.witnessName}</a>
              </Text>
            </View>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;
