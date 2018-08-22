# `atomic-timing`

This is a utility to accurately measure browser performance timings.

### How it works

This packages utilising the [Performance Resource Timimg API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) to gather information on the request & response lifecycle made by the browser. The exact interface for this API can be viewed [here](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface). Additionally, a lifecycle diagram of events can be seen [here](https://www.w3.org/TR/navigation-timing/#processing-model).

### How to use

The package exports two properties, `function measure(): Promise<object>` and `const setup: String`. The string exported in `setup` must be included in the head of your HTML above any other scripts. This snippet includes the necessary setup of `PerformanceObservers` and event listeners to gather all information.

Somewhere after that snippet has been included, you can request the measurement with:

```js
const timings = await measure()
```

_Note:_ the promise returned by the `measure` function will not resolve until the page is consistently interactive. Which, depending on your application, might be sometime.

### Timing response

The resolved object given by the `measure` function will be as follows:

```js
{
  // Performance Resource Timimg API Properties
  "navigationStart": Number,
  "unloadEventStart": Number,
  "unloadEventEnd": Number,
  "redirectStart": Number,
  "redirectEnd": Number,
  "fetchStart": Number,
  "domainLookupStart": Number,
  "domainLookupEnd": Number,
  "connectStart": Number,
  "connectEnd": Number,
  "secureConnectionStart": Number,
  "requestStart": Number,
  "responseStart": Number,
  "responseEnd": Number,
  "domLoading": Number,
  "domInteractive": Number,
  "domContentLoadedEventStart": Number,
  "domContentLoadedEventEnd": Number,
  "domComplete": Number,
  "loadEventStart": Number,
  "loadEventEnd": Number,

  // Custom computed metrics
  "ttci": Number,
  "ttfp": Number,
  "ttfcp": Number,
  "domContentLoaded": Number,
  "domProcessingTime": Number,
  "pageLoad": Number,
  "dnsLookupTime": Number,
  "redirectTime": Number,
  "tcpConnectionTime": Number,
  "ttfb": Number,
  "responseProcessingTime": Number
}
```

### Browser support

The metrics returned by the [Performance Resource Timimg API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) will work in all browsers that support that API. Some custom metrics will require support for the [Performance Observer API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
