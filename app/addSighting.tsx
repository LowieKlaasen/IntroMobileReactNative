import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import ISighting from "./interfaces/ISighting";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddSighting = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    // Alert.alert("Submitted Text:", title);
    setTitle("");
    console.log("title: " + title);

    setWitnessName("");
    console.log("witnessName: " + witnessName);

    setDescription("");
    console.log("description: " + description);

    setEmail("");
    console.log("email: " + email);
  };

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  async function getNextId(): Promise<number> {
    const sightings = await getAllData(); // Now it returns an array

    sightings.forEach((element) => {
      console.log(element); // Now you can iterate without error
    });

    const highestId = Math.max(...sightings.map((s) => s.id), 0); // Get max ID
    setId(highestId + 1); // Set next ID
    console.log("Next ID:", highestId + 1);

    return highestId + 1;
  }

  const storeData = async () => {
    let sighting: ISighting = {
      id: await getNextId(),
      witnessName: witnessName,
      description: description,
      picture: picture,
      status: "unconfirmed",
      witnessContact: email,
      dateTime: getCurrentTime(),
      location: {
        latitude: 12,
        longitude: 12,
      },
    };

    try {
      await AsyncStorage.setItem(
        sighting.id.toString(),
        JSON.stringify(sighting)
      );
      console.log(`Stored: ${sighting.id} - ${sighting.witnessName}`);
      setWitnessName("");
    } catch (error) {
      console.log("Error storing data:", error);
    }
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
    <View style={styles.bigView}>
      <h2>Report sighting</h2>
      <Text style={styles.inputHeader}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title here..."
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.inputHeader}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name here ..."
        value={witnessName}
        onChangeText={setWitnessName}
      />
      <Text style={styles.inputHeader}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description here ..."
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.inputHeader}>Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email here ..."
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.inputHeader}>Picture</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter picture here ..."
        value={picture}
        onChangeText={setPicture}
      />
      <View style={styles.whiteSpace}></View>
      <Button title="Submit" onPress={storeData} color="darkblue" />
      <br />
      <Button title="Get all sightings" onPress={getAllData} />
    </View>
  );
};

const styles = StyleSheet.create({
  bigView: {
    // borderColor: "red",
    // borderWidth: 1,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 7,
    borderRadius: 3,
  },
  inputHeader: {
    fontWeight: "bold",
  },
  pressable: {
    borderWidth: 1,
    borderColor: "lime",
  },
  whiteSpace: {
    height: 12,
  },
});

export default AddSighting;
