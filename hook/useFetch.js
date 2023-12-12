import { useState, useEffect } from "react";
import axios from "axios";
import Config from "react-native-config" 

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": '19a88da89dmsh22e71daaa24a989p15acf4jsnf33735612f4a',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
  
      // Optionally, you can log specific error details
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;