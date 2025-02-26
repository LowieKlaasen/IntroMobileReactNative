import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="sightings/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="addSighting"
        options={{
          title: "New Sighting",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="eye-plus" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
