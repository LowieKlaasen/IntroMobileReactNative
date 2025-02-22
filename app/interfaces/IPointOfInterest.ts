export default interface IPointOfInterest {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }