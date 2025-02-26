import { gridLayer } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Text,
  Pressable,
} from "react-native";

const AddSighting = () => {
  const [title, setTitle] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

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
      <View style={styles.whiteSpace}></View>
      <Button title="Submit" onPress={handleSubmit} color="darkblue" />
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
