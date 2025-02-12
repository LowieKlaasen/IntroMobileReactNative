import { View } from "react-native"

const List = () => {
    let sightings =  getLocationsFromApi();
    console.log(sightings);

    if (sightings != null) {
      sightings.forEach(element => {
        
      });
    }
    
    return (<View>List</View>)
}

const getLocationsFromApi = () => {
    return fetch('https://sampleapis.assimilate.be/ufo/sightings')
      .then(response => response.json())
      .then(json => {
        // console.log("Api call succeeded")
        // console.log(json[1]);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

export default List;

export interface ISighting {
  "id" : string,
  "witnessName" : string
}