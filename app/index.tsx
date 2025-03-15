"use dom";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import useSightings from "@/service/sighting";
import ISighting from "./interfaces/ISighting";

interface LocationHandlerProps {
  addMarker: (lat: number, lng: number) => void;
}

const LocationHandler = ({ addMarker }: LocationHandlerProps) => {
  const map = useMapEvents({
    click: (e) => {
      addMarker(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

const Index = () => {
  const { data: sightings, loading } = useSightings();
  const [pointsOfInterest, setPointsOfInterest] = useState<ISighting[]>([]);

  useEffect(() => {
    if (!loading) {
      setPointsOfInterest(sightings);
    }
  }, [sightings, loading]);

  const iconX = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png",
    iconSize: [48, 48],
    popupAnchor: [-3, 0],
  });

  const addPointOfInterest = (lat: number, lng: number) => {
    setPointsOfInterest([
      ...pointsOfInterest,
      {
        id: Date.now(),
        witnessName: "New Point",
        location: { latitude: lat, longitude: lng },
        description: "",
        picture: "",
        status: "",
        dateTime: "",
        witnessContact: "",
      },
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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationHandler addMarker={addPointOfInterest} />
      {pointsOfInterest.map((point) => (
        <Marker
          key={point.id}
          position={[point.location.latitude, point.location.longitude]}
          icon={iconX}
        >
          <Popup>
            <View style={{ backgroundColor: "white", padding: 10, width: 100 }}>
              <Text>
                <a href={`/sightings/${point.id}`}>{point.witnessName}</a>
              </Text>
            </View>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;
