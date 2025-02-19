import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const API_URL = 'https://sampleapis.assimilate.be/ufo/sightings'; // Replace with your actual API URL

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // return (
  //   <View style={styles.container}>
  //     <FlatList
  //       data={data}
  //       keyExtractor={(item, index) => index.toString()}
  //       renderItem={({ item }) => (
  //         <View style={styles.itemContainer}>
  //           <Text style={styles.itemText}>{JSON.stringify(item, null, 2)}</Text>
  //         </View>
  //       )}
  //     />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}> {item.id}. {item.witnessName} </Text>
            <Text style={styles.itemInfo}> {item.location.latitude}. {item.location.longitude} </Text>
          </View>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
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
    fontStyle: "italic"
  }
});

export default List;