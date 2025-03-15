// sighting.ts
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ISighting from "@/app/interfaces/ISighting";

const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

const useSightings = () => {
  const [data, setData] = useState<ISighting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSightingsFromAsyncStorage = async () => {
    try {
      const storedSightings = await AsyncStorage.getItem("sightings");
      if (storedSightings) {
        setData(JSON.parse(storedSightings));
      } else {
        await fetchSightingsFromAPI();
      }
    } catch (error) {
      console.error("Error retrieving sightings from AsyncStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSightingsFromAPI = async () => {
    try {
      const response = await fetch(API_URL);
      const json: ISighting[] = await response.json();
      await AsyncStorage.setItem("sightings", JSON.stringify(json));
      setData(json);
    } catch (error) {
      console.error("Error fetching sightings from API:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshSightings = async () => {
    setLoading(true);
    await fetchSightingsFromAsyncStorage();
  };

  const getSightingById = async (id: number): Promise<ISighting | null> => {
    try {
      const storedSightings = await AsyncStorage.getItem("sightings");
      if (!storedSightings) return null;
      const sightings: ISighting[] = JSON.parse(storedSightings);
      return sightings.find((sighting) => sighting.id === id) || null;
    } catch (error) {
      console.error("Error retrieving sighting by ID:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchSightingsFromAsyncStorage();
  }, []);

  return { data, loading, refreshSightings, getSightingById };
};

export default useSightings;
