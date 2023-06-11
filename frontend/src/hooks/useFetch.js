import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(Context)

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: context.appState.token,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}
