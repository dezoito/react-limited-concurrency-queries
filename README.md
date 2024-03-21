# Limited Concurrency Demo

This project showcases a technique to queue and limit the number of concurrent calls to an API, by leveraging [tanstack-query](https://tanstack.com/query/latest) features.

This technique is useful when you don't want to make numerous simultaneous calls to an API server, such as:

- The calls you are making are resource expensive, putting heavy demand on the server.
- You have rate limits on the API.
- Your users expect the calls to be queued and processed sequentially.

MENTION ARTICLE

## The use-case

In this example, we will use a very complex on-premisses AI API to determine if each cclient in a list is eligible for a discount.

As each of these queries can require a ton of memory and processing power, we want to queue each name, instead of sending multiple concurrent calls and risk crashing the API server.
