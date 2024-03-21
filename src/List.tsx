/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";

/**
 * SIMULATION:
 * Asynchronously gets an inference for the given name.
 *
 * @param {string} name - The name for which to get the inference.
 * @return {Object} An object containing the name and the inference result.
 */
async function getInference(name: string) {
  console.log("getting inference for", name);
  const rand = Math.floor(Math.random() * 3) + 1;
  await new Promise((res) => setTimeout(res, rand * 1000));
  return {
    name,
    inference: Math.random() > 0.5,
  };
}

// Creates an array of client names
const names = [
  "Ava Jones",
  "David Garcia",
  "Evelyn Lee",
  "Grace Ramirez",
  "James Miller",
  "Michael Hernandez",
  "Noah Thompson",
  "Rose Carter",
];

function List() {
  const [noCompleted, setNoCompleted] = useState(0);
  const [concurrentRequests, setConcurrentRequests] = useState(0);
  const queryClient = useQueryClient();

  // Enable one query at a time (concurrentRequests = 0), disable all once they've all been processed
  // so new experiments can run sequentially
  const queries = names.map((name: string, i: number) => ({
    queryKey: ["get_inference", name],
    queryFn: () => getInference(name),
    enabled:
      i === 0 ||
      (i <= noCompleted + concurrentRequests && noCompleted !== names.length),
  }));

  const results = useQueries({ queries: queries });

  const lastFetched = results.filter((r) => r.isFetched);

  useEffect(() => {
    setNoCompleted(lastFetched.length);
  }, [lastFetched]);

  return (
    <div>
      <div>
        Verify if the clients in our database are elegible for a discount.
        <br />
        {concurrentRequests == 0 ? (
          <span>One query at a time</span>
        ) : (
          <span>{concurrentRequests + 1} queries at time</span>
        )}
        :
      </div>
      <ul>
        {results.map(
          (result: any, index: number) =>
            result.data && (
              <li key={index}>
                {result.data.name}:{" "}
                {result.data.inference ? (
                  <span style={{ color: "green" }}>Approved</span>
                ) : (
                  <span style={{ color: "red" }}>Declined</span>
                )}
              </li>
            ),
        )}
      </ul>

      <div>
        {/* Add link to increase concurrency if we are done fetching */}
        {noCompleted === names.length && (
          <a
            href="#"
            onClick={() => {
              setConcurrentRequests((c) => c + 1);
              queryClient.removeQueries();
            }}
          >
            Increase Concurrent Requests
          </a>
        )}
      </div>
    </div>
  );
}

export default List;
