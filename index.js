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

        if (!performance) return Promise.resolve({})

        const t = performance.timing

        if (!t) return Promise.resolve({})

        const ttci = await ttiPolyfill.getFirstConsistentlyInteractive()
        const { __ttfp: ttfp = null, __ttfcp: ttfcp = null } = window
        const domContentLoaded = t.domContentLoadedEventEnd - t.fetchStart
        const domProcessingTime = t.domComplete - t.domLoading
        const pageLoad = t.loadEventEnd - t.fetchStart
        const dnsLookupTime = t.domainLookupEnd - t.domainLookupStart
        const redirectTime = t.redirectEnd - t.redirectStart
        const tcpConnectionTime = t.connectEnd - t.connectStart
        const ttfb = t.responseStart - t.requestStart
        const responseProcessingTime = t.responseEnd - t.responseStart

        resolve({
          ...t.toJSON(),
          ttci,
          ttfp,
          ttfcp,
          domContentLoaded,
          domProcessingTime,
          pageLoad,
          dnsLookupTime,
          redirectTime,
          tcpConnectionTime,
          ttfb,
          responseProcessingTime
        })
      }, 0)
    })
  })
}
