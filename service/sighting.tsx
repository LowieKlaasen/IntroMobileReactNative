import ISighting from "@/app/interfaces/ISighting";
import { useEffect, useState } from "react";

const API_URL = "https://sampleapis.assimilate.be/ufo/sightings";

const useSightings = () => {
  const [data, setData] = useState<ISighting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json: ISighting[] = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading }; // Return the fetched data and loading state
};

export default useSightings;
