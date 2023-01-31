import { useEffect, useState } from "react";
import axios from "axios";
export default function useFetch(link) {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(link)
      .then((result) => {
        setResponse(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
}
