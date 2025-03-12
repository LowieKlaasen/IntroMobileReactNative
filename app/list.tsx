import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import ILocation from "./interfaces/ILocation";
import ISighting from "./interfaces/ISighting";
import useSightings from "@/service/sighting";
import AsyncStorage from "@react-native-async-storage/async-storage";

// interface ILocation {
//   latitude: number,
//   longitude: number
// }

// interface ISighting {
//   id : number,
//   witnessName : string,
//   location : ILocation,
//   description : string,
//   picture : string,
//   status : string,
//   dateTime : string,
//   witnessContact : string
// }

// const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

const List = () => {
  // const [data, setData] = useState<ISighting[]>([]);
  const { data, loading } = useSightings();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       const json: ISighting[] = await response.json();
  //       setData(json);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
              {" "}
              <a href={"/sightings/" + item.id}>
                {item.id}. {item.witnessName}
              </a>{" "}
            </Text>
            <Text style={styles.itemInfo}>
              {" "}
              {item.location.latitude}. {item.location.longitude}{" "}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemInfo: {
    fontSize: 12,
    color: "grey",
    fontStyle: "italic",
  },
});

export default List;
