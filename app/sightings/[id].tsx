// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Image, FlatList } from "react-native";
// import sightings from "@/service/sighting";
// import ISighting from "../interfaces/ISighting";

// let API_URL: string = "";

// const Sighting = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [data, setData] = useState<ISighting>();

//   console.log(id);

//   API_URL = `https://sampleapis.assimilate.be/ufo/sightings/${id}`;

//   // let sighting : ISighting = sightings.filter(s => s.id == numberId)
//   // console.log(sightings.filter(s => s.id == numberId));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const json: ISighting = await response.json();
//         setData(json);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("sighting: " + data);
//   console.log(data?.id);
//   console.log(data?.picture);

//   //region dateTime

//   const dateTime = data?.dateTime;

//   const date = dateTime?.split("T")[0];
//   console.log("date: " + date);

//   const year = date?.split("-")[0];
//   const month = date?.split("-")[1];
//   const day = date?.split("-")[2];

//   console.log("year: " + year);
//   console.log("month: " + month);
//   console.log("day: " + day);

//   const monthNumber = parseInt(month || "0", 10);
//   const monthString = months[monthNumber];

//   const dayNumber = parseInt(day || "0", 10);

//   console.log(monthString);

//   const pictureLink = data?.picture;

//   //endregion

//   return (
//     <View style={styles.view}>
//       <Text style={styles.title}>
//         Sighting {dayNumber} {monthString} {year}
//       </Text>
//       <Text style={styles.witnessName}>{data?.witnessName}</Text>
//       <View style={styles.flex}>
//         <Image
//           style={styles.image}
//           source={{
//             uri: data?.picture,
//           }}
//         />
//         <View>
//           <Text style={styles.caption}>
//             <strong>Description</strong>
//             <br></br>
//             {data?.description}
//           </Text>
//           <Text style={styles.caption}>
//             <strong>Location</strong>
//             <br />
//             latitude: {data?.location.latitude}
//             <br />
//             longitude: {data?.location.longitude}
//           </Text>
//           <View>
//             <Text>
//               <strong>Status</strong>
//             </Text>
//             <View style={styles.statusBox}>
//               <Image
//                 style={styles.icon}
//                 source={
//                   data?.status === "confirmed"
//                     ? require("../../assets/icons/Check.png")
//                     : data?.status === "unconfirmed"
//                     ? require("../../assets/icons/Cross.png")
//                     : require("../../assets/icons/Default.png")
//                 }
//               />
//               <Text style={styles.statusText}>{data?.status}</Text>
//             </View>
//           </View>
//           <View style={{ marginTop: 5 }}>
//             <Text>
//               <strong>Spotted by:</strong>
//               <br />
//               {data?.witnessName}
//               <br />
//               <u>{data?.witnessContact}</u>
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Sighting;

// const styles = StyleSheet.create({
//   view: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: "lightgray",
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     paddingBottom: 5,
//   },
//   witnessName: {
//     fontStyle: "italic",
//     color: "gray",
//     marginBottom: 5,
//   },
//   image: {
//     width: 500,
//     height: 500,
//     resizeMode: "contain",
//     marginRight: 8,
//   },
//   flex: {
//     flex: 2,
//     flexDirection: "row",
//   },
//   caption: {
//     marginBottom: 5,
//   },
//   icon: {
//     height: 20,
//     width: 20,
//     resizeMode: "contain",
//     marginRight: 5,
//     marginTop: 5,
//   },
//   statusBox: {
//     flex: 2,
//     alignItems: "flex-start",
//     flexDirection: "row",
//   },
//   statusText: { alignSelf: "center" },
// });

// enum months {
//   January = 1,
//   February,
//   March,
//   April,
//   May,
//   June,
//   July,
//   August,
//   September,
//   October,
//   November,
//   December,
// }

import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import useSightings from "@/service/sighting"; // Import the custom hook
import ISighting from "../interfaces/ISighting";

const Sighting = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Get the ID from the URL params
  const { getSightingById } = useSightings(); // Get the `getSightingById` function from the hook
  const [data, setData] = useState<ISighting | null>(null); // State to store the sighting data

  // Get the sighting data when the component mounts or `id` changes
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const sighting = await getSightingById(parseInt(id));
        setData(sighting); // Set the data from AsyncStorage
      }
    };

    fetchData();
  }, [id, getSightingById]);

  // If there's no data yet, show a loading indicator or something else
  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Parsing the date for display
  const dateTime = data?.dateTime;
  const date = dateTime?.split("T")[0];
  const [year, month, day] = date?.split("-") || ["", "", ""];

  const monthString = months[parseInt(month || "0", 10)];

  return (
    <View style={styles.view}>
      <Text style={styles.title}>
        Sighting {parseInt(day || "0")} {monthString} {year}
      </Text>
      <Text style={styles.witnessName}>{data?.witnessName}</Text>
      <View style={styles.flex}>
        <Image
          style={styles.image}
          source={{
            uri: data?.picture,
          }}
        />
        <View>
          <Text style={styles.caption}>
            <strong>Description</strong>
            <br />
            {data?.description}
          </Text>
          <Text style={styles.caption}>
            <strong>Location</strong>
            <br />
            latitude: {data?.location.latitude}
            <br />
            longitude: {data?.location.longitude}
          </Text>
          <View>
            <Text>
              <strong>Status</strong>
            </Text>
            <View style={styles.statusBox}>
              <Image
                style={styles.icon}
                source={
                  data?.status === "confirmed"
                    ? require("../../assets/icons/Check.png")
                    : data?.status === "unconfirmed"
                    ? require("../../assets/icons/Cross.png")
                    : require("../../assets/icons/Default.png")
                }
              />
              <Text style={styles.statusText}>{data?.status}</Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text>
              <strong>Spotted by:</strong>
              <br />
              {data?.witnessName}
              <br />
              <u>{data?.witnessContact}</u>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Sighting;

const styles = StyleSheet.create({
  view: {
    margin: 10,
    padding: 10,
    backgroundColor: "lightgray",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  witnessName: {
    fontStyle: "italic",
    color: "gray",
    marginBottom: 5,
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: "contain",
    marginRight: 8,
  },
  flex: {
    flex: 2,
    flexDirection: "row",
  },
  caption: {
    marginBottom: 5,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
    marginTop: 5,
  },
  statusBox: {
    flex: 2,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  statusText: { alignSelf: "center" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Enum for months to convert month number to name
enum months {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
