import ISighting from "@/app/interfaces/ISighting";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

// Custom hook for fetching sightings
const useSightings = () => {
  const [data, setData] = useState<ISighting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        // Check if sightings are already stored in AsyncStorage
        const storedSightings = await AsyncStorage.getItem("sightings");

        if (storedSightings) {
          // If sightings are already in AsyncStorage, use them
          setData(JSON.parse(storedSightings));
          setLoading(false);
        } else {
          // If no sightings are in AsyncStorage, fetch from API
          const response = await fetch(API_URL);
          const json: ISighting[] = await response.json();

          // Store each sighting separately in AsyncStorage
          json.forEach(async (sighting) => {
            await AsyncStorage.setItem(
              sighting.id.toString(),
              JSON.stringify(sighting)
            );
          });

          setData(json); // Set the data state
          setLoading(false); // Set loading to false
        }
      } catch (error) {
        console.error("Error fetching or storing sightings:", error);
        setLoading(false); // Ensure loading is false if there's an error
      }
    };

    fetchSightings();
  }, []); // Empty dependency array to run only once on app startup

  return { data, loading };
};

export default useSightings;
