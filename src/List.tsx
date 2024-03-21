/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";

async function get_inference(name: string) {
  // Simulate an API call
  // wait for a random period between 1 and 4 seconds
  // return an object with the name and the inference,
  // which is randomly true or false
  console.log("getting inference for", name);
  const rand = Math.floor(Math.random() * 3) + 1;
  await new Promise((res) => setTimeout(res, rand * 1000));
  return {
    name,
    inference: Math.random() > 0.5,
  };
}

function List() {
  const names = [
    "Rose Carter",
    "Noah Thompson",
    "Grace Ramirez",
    "James Miller",
    "Ava Jones",
    "David Garcia",
    "Evelyn Lee",
    "Michael Hernandez",
  ];

  const [noCompleted, setNoCompleted] = useState(0);
  const concurrentRequests = 0;

  // Enable one query at a time (concurrentRequests = 0), disable all once they've all been processed
  // so new experiments can run sequentially
  const queries = names.map((name: string, i: number) => ({
    queryKey: ["get_inference", name],
    queryFn: () => get_inference(name),
    enabled:
      i === 0 ||
      (i <= noCompleted + concurrentRequests && noCompleted !== names.length),
    // staleTime: 0,
    // cacheTime: 0,
  }));

  const results = useQueries({ queries: queries });

  const lastFetched = results.filter((r) => r.isFetched);

  useEffect(() => {
    setNoCompleted(lastFetched.length);
  }, [lastFetched]);

  return (
    <div>
      <div>Process a list of 8 names, checking for eligibility:</div>
      <ul>
        {results.map(
          (result: any, index: number) =>
            result.data && (
              <li key={index}>
                {result.data.name} -{" "}
                {result.data.inference ? (
                  <span style={{ color: "green" }}>Approved</span>
                ) : (
                  <span style={{ color: "red" }}>Declined</span>
                )}
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export default List;
