import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import List from "./List";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <h1 style={{ textAlign: "center" }}>Limited Concurrency Demo</h1>

        <List />
      </>
    </QueryClientProvider>
  );
}

export default App;
