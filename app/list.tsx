import { View } from "react-native"

const List = () => {
    getLocationsFromApi();
    return (<View>List</View>)
}

const getLocationsFromApi = () => {
    return fetch('https://sampleapis.assimilate.be/ufo/sightings')
      .then(response => response.json())
      .then(json => {
        console.log("Api call succeeded")
        console.log(json);
        return json.movies;
      })
      .catch(error => {
        console.error(error);
      });
  };

export default List;