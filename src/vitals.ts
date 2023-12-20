const reportWebVitals = (onPerfEntry: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(
      ({ onCLS, onFCP, onFID, onINP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onFCP(console.log);
        onFID(console.log);
        onINP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
      }
    );
  }
};

reportWebVitals(console.log);
