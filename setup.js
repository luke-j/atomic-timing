// Required for ttfp & ttfcp
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (['first-paint', 'first-contentful-paint'].includes(entry.name)) {
        const key = entry.name === 'first-paint' ? '__ttfp' : '__ttfcp'
        window[key] = entry.startTime + entry.duration
      }
    }
  })

  observer.observe({ entryTypes: ['resource', 'paint'] })
}

// Required for tti
if ('PerformanceLongTaskTiming' in window) {
  const ttiObserver = (window.__tti = { e: [] })

  ttiObserver.o = new PerformanceObserver(list => {
    ttiObserver.e = ttiObserver.e.concat(list.getEntries())
  })

  ttiObserver.o.observe({ entryTypes: ['longtask'] })
}
