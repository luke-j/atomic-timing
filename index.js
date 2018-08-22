import ttiPolyfill from 'tti-polyfill'

import setupString from './bin/setup.min.js'

export const setup = setupString

export const measure = async () => {
  if (!window || !('addEventListener' in window)) return Promise.resolve({})

  return new Promise(resolve => {
    window.addEventListener('load', () => {
      setTimeout(async () => {
        const performance =
          window.performance ||
          window.webkitPerformance ||
          window.msPerformance ||
          window.mozPerformance

        if (!performance) return

        const timing = performance.timing

        if (!timing) return

        // window.timing interface & processing model
        // https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface
        // https://www.w3.org/TR/navigation-timing/#processing-model
        const {
          navigationStart,
          unloadEventStart,
          unloadEventEnd,
          redirectStart,
          redirectEnd,
          fetchStart,
          domainLookupStart,
          domainLookupEnd,
          connectStart,
          connectEnd,
          secureConnectionStart,
          requestStart,
          responseStart,
          responseEnd,
          domLoading,
          domInteractive,
          domContentLoadedEventStart,
          domContentLoadedEventEnd,
          domComplete,
          loadEventStart,
          loadEventEnd
        } = timing
        const firstInputDelay = await new Promise(resolve => {
          if (!perfMetrics) resolve(null)

          perfMetrics.onFirstInputDelay(delay => resolve(delay))
        })
        const ttci = await ttiPolyfill.getFirstConsistentlyInteractive()
        const { __ttfp: ttfp = null, __ttfcp: ttfcp = null } = window

        resolve(
          Object.assign({}, timing, {
            firstInputDelay,
            ttci,
            ttfp,
            ttfcp,
            domContentLoaded: domContentLoadedEventEnd - fetchStart,
            domProcessingTime: domComplete - domLoading,
            pageLoad: loadEventEnd - fetchStart,
            dnsLookupTime: domainLookupEnd - domainLookupStart,
            redirectTime: redirectEnd - redirectStart,
            tcpConnectionTime: connectEnd - connectStart,
            ttfb: responseStart - requestStart,
            responseProcessingTime: responseEnd - responseStart
          })
        )
      }, 0)
    })
  })
}
