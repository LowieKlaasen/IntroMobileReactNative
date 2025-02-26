import React from "react";

import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Student {
  name: string;
  age: number;
}

const storeData = async () => {
  let student: Student = {
    name: "John Doe",
    age: Math.floor(Math.random() * 10) + 18,
  };
  await AsyncStorage.setItem("randomStudent", JSON.stringify(student));
};

const getData = async () => {
  const value: string = await AsyncStorage.getItem("randomStudent");
  if (value !== null) {
    let student: Student = JSON.parse(value);
    console.log(student.name + " is " + student.age + " years old");
  } else {
    console.log("No Data found");
  }
};
const Test = () => {
  return (
    <View>
      <Text>AsyncStorage</Text>
      <Button title="Store Data" onPress={storeData} />
      <Button title="Load Data" onPress={getData} />
    </View>
  );
};

export default Test;
