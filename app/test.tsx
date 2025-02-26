import React, { useState } from "react";

import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Student {
  name: string;
  age: number;
}

const Test = () => {
  const [studentName, setStudentName] = useState("");

  const storeData = async () => {
    let student: Student = {
      name: studentName,
      age: Math.floor(Math.random() * 10) + 18,
    };
    await AsyncStorage.setItem("randomStudent", JSON.stringify(student));

    setStudentName("");
  };

  const getData = async () => {
    const value = await AsyncStorage.getItem("randomStudent");

    if (value !== null) {
      let student: Student = JSON.parse(value);
      console.log(`${student.name} is ${student.age} years old`);
    } else {
      console.log("No Data found");
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
      <Button title="Load Data" onPress={getData} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default Test;
