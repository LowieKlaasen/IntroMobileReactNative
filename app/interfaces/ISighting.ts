import ILocation from "./ILocation"

export default interface ISighting {
  id : number,
  witnessName : string,
  location : ILocation,
  description : string,
  picture : string,
  status : string,
  dateTime : string,
  witnessContact : string
}