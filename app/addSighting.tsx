import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ISighting from "@/app/interfaces/ISighting";

const AddSighting = () => {
  const [title, setTitle] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  function getCurrentTime() {
    return new Date().toLocaleTimeString();
  }

  async function getNextId(): Promise<number> {
    const sightings = await getAllData();
    const highestId = Math.max(...sightings.map((s) => s.id), 0);
    return highestId + 1;
  }

  const storeData = async () => {
    try {
      const existingSightings = await getAllData();
      const sighting: ISighting = {
        id: await getNextId(),
        witnessName,
        description,
        picture,
        status: "unconfirmed",
        witnessContact: email,
        dateTime: getCurrentTime(),
        location: { latitude: 12, longitude: 12 },
      };

      const updatedSightings = [...existingSightings, sighting];
      await AsyncStorage.setItem("sightings", JSON.stringify(updatedSightings));
      console.log(`Stored: ${sighting.id} - ${sighting.witnessName}`);

      setTitle("");
      setWitnessName("");
      setDescription("");
      setEmail("");
      setPicture("");
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const getAllData = async (): Promise<ISighting[]> => {
    try {
      const storedSightings = await AsyncStorage.getItem("sightings");
      return storedSightings ? JSON.parse(storedSightings) : [];
    } catch (error) {
      console.log("Error retrieving sightings:", error);
      return [];
    }
  };

  return (
    <View style={styles.bigView}>
      <Text style={styles.header}>Report Sighting</Text>
      <Text style={styles.inputHeader}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title..."
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.inputHeader}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name..."
        value={witnessName}
        onChangeText={setWitnessName}
      />
      <Text style={styles.inputHeader}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description..."
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.inputHeader}>Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email..."
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.inputHeader}>Picture</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter picture URL..."
        value={picture}
        onChangeText={setPicture}
      />
      <View style={styles.whiteSpace} />
      <Button title="Submit" onPress={storeData} color="darkblue" />
    </View>
  );
};

const styles = StyleSheet.create({
  bigView: { margin: 10 },
  input: { borderWidth: 1, borderColor: "gray", padding: 7, borderRadius: 3 },
  inputHeader: { fontWeight: "bold" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  whiteSpace: { height: 12 },
});

export default AddSighting;
