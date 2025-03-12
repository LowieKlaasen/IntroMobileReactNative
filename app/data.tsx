import React from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ISighting from "./interfaces/ISighting";

const Data = () => {
  const clearData = async () => {
    AsyncStorage.clear()
      .then(() => {
        console.log("All data cleared");
      })
      .catch((error) => {
        console.error("Error clearing data: ", error);
      });
  };

  const getAllData = async (): Promise<ISighting[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys(); // Get all keys
      if (keys.length === 0) {
        console.log("No data found");
        return [];
      }

      const values = await AsyncStorage.multiGet(keys); // Get all key-value pairs
      const sightings = values
        .map(([key, value]) => (value ? JSON.parse(value) : null)) // Parse JSON
        .filter((sighting) => sighting !== null); // Remove null values

      console.log("All sigthings:", sightings);

      return sightings;
    } catch (error) {
      console.log("Error retrieving all data:", error);
      return [];
    }
  };

  return (
    <View>
      <Button title="Get all data" onPress={getAllData} color="blue" />
      <br />
      <Button title="Clear data" onPress={clearData} color="red" />
    </View>
  );
};

export default Data;
