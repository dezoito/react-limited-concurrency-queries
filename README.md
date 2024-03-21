# Limited Concurrency Demo

This project showcases a technique to queue and limit the number of concurrent calls to an API, by leveraging [tanstack-query](https://tanstack.com/query/latest) features.

Please read the [Limited Concurrency for Multiple API calls in React](http://dezoito.github.io/2024/03/21/react-limited-concurrency.html) article for a detailed explanation of the concepts and code used in this demo.

This technique is useful when you don't want to make numerous simultaneous calls to an API server, such as:

- The calls you are making are resource expensive, putting heavy demand on the server.
- You have rate limits on the API.
- Your users expect the calls to be queued and processed sequentially.

In the animation below, we process the same list, first sequentially, then with 2 and 3 concurrent calls at a time:

<img src="./images/demo.gif" alt="Demo"/>

## How to run

Clone this repository and cd to the project folder:

```sh
git clone https://github.com/dezoito/queries-app.git
cd ./queries-app
```

Install the dependecies:

```sh
yarn install
```

Run the project

```sh
yarn dev
```

Check the output of the last command to see the host and port where it is running:

```sh
  VITE v5.2.2  ready in 283 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
