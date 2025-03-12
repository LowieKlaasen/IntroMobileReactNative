// import ISighting from "@/app/interfaces/ISighting";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

// // Custom hook for fetching sightings
// const useSightings = () => {
//   const [data, setData] = useState<ISighting[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSightingsFromAsyncStorage = async () => {
//     try {
//       // Check if sightings are stored in AsyncStorage
//       const storedSightings = await AsyncStorage.getItem("sightings");

//       if (storedSightings) {
//         // If sightings exist, use them
//         setData(JSON.parse(storedSightings));
//         setLoading(false);
//       } else {
//         // If no sightings are stored, fetch from the API
//         await fetchSightingsFromAPI();
//       }
//     } catch (error) {
//       console.error("Error retrieving sightings from AsyncStorage:", error);
//       setLoading(false); // Ensure loading is false if there's an error
//     }
//   };

//   const fetchSightingsFromAPI = async () => {
//     try {
//       const response = await fetch(API_URL);
//       const json: ISighting[] = await response.json();

//       // Store the fetched sightings in AsyncStorage
//       await AsyncStorage.setItem("sightings", JSON.stringify(json));

//       setData(json); // Set the data state
//       setLoading(false); // Set loading to false
//     } catch (error) {
//       console.error("Error fetching sightings from API:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSightingsFromAsyncStorage();
//   }, []); // Empty dependency array ensures this runs only once on initial load

//   return { data, loading, fetchSightingsFromAsyncStorage };
// };

// export default useSightings;

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ISighting from "@/app/interfaces/ISighting";

const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

// Custom hook for fetching sightings
const useSightings = () => {
  const [data, setData] = useState<ISighting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSightingsFromAsyncStorage = async () => {
    try {
      // Check if sightings are stored in AsyncStorage
      const storedSightings = await AsyncStorage.getItem("sightings");

      if (storedSightings) {
        // If sightings exist, use them
        setData(JSON.parse(storedSightings));
        setLoading(false);
      } else {
        // If no sightings are stored, fetch from the API
        await fetchSightingsFromAPI();
      }
    } catch (error) {
      console.error("Error retrieving sightings from AsyncStorage:", error);
      setLoading(false); // Ensure loading is false if there's an error
    }
  };

  const fetchSightingsFromAPI = async () => {
    try {
      const response = await fetch(API_URL);
      const json: ISighting[] = await response.json();

      // Store the fetched sightings in AsyncStorage
      await AsyncStorage.setItem("sightings", JSON.stringify(json));

      setData(json); // Set the data state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching sightings from API:", error);
      setLoading(false);
    }
  };

  // Refresh function to re-fetch sightings from AsyncStorage
  const refreshSightings = async () => {
    setLoading(true); // Set loading state while fetching
    await fetchSightingsFromAsyncStorage(); // Re-fetch data
  };

  useEffect(() => {
    fetchSightingsFromAsyncStorage(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures this runs only once on initial load

  return { data, loading, refreshSightings };
};

export default useSightings;
