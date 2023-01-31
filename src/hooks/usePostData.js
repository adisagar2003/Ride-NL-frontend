import axios from "axios";
import { useEffect, useState } from "react";

export default function usePostData(url, formData) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  useEffect(fetchData, []);
  function fetchData() {
    setLoading(true);
    axios
      .post(url, formData)
      .then((result) => {
        setResponse(result);
        console.log(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
        setLoading(false);
      });
  }

  return { loading, error, response };
}
