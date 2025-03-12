import useSightings from "@/service/sighting";

const Test = () => {
  const { data, loading } = useSightings();

  if (loading) {
    return console.log("loading");
  }

  console.log(data);
};

export default Test;
