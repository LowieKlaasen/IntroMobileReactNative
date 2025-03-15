import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import useSightings from "@/service/sighting";

// const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

const List = () => {
  const { data, loading } = useSightings();

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
