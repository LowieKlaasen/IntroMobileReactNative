import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Student {
  name: string;
  age: number;
}

const Test = () => {
  const [studentName, setStudentName] = useState("");
  const [nameToGet, setNameToGet] = useState("");

  const storeData = async () => {
    let student: Student = {
      name: studentName,
      age: Math.floor(Math.random() * 10) + 18,
    };

    try {
      await AsyncStorage.setItem(student.name, JSON.stringify(student));
      console.log(`Stored: ${student.name} - ${student.age}`);
      setStudentName("");
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const getData = async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        let student: Student = JSON.parse(value);
        console.log(`${student.name} is ${student.age} years old`);
      } else {
        console.log("No Data found for this name");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  return (
    <View>
      <Text>AsyncStorage Example</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter name..."
        value={studentName}
        onChangeText={setStudentName}
      />

      <Button title="Store Data" onPress={storeData} />

      <TextInput
        style={styles.input}
        placeholder="Enter name you want to retrieve"
        value={nameToGet}
        onChangeText={setNameToGet}
      />

      <Button title="Load Data" onPress={() => getData(nameToGet)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default Test;
