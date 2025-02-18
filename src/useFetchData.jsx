import { useState, useEffect } from "react";
import chalk from "chalk";
/**
 * useFetchData is a custom hook that simplifies data fetching in React components.
 * It takes a URL as an argument and returns the fetched data, a loading state, and any errors encountered.
 */
function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(chalk.blue("Fetching data from:"), chalk.green(url));
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(chalk.green("Data fetched successfully:"), result);
        setData(result);
      } catch (err) {
        console.log(chalk.red("Error fetching data:"), err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
