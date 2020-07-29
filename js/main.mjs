import LoadTemplate from "./template.mjs";
import WaterCourse from "./watercourse.mjs";

const cdnjs = "https://cdnjs.cloudflare.com/ajax/libs/";

/* Load CSS dependencies. */
Object.entries({
  "mapbox-gl/1.11.1/mapbox-gl": "KxWh2zhfqjqLf8V6nej7w8PbXiZuqrQq+PA1EE+73+7dpYbMocKIXKPlq50ZaWPDY5iQcyaX3I4xLUuOWBCCug==",
  "materialize/1.0.0/css/materialize": "UJfAaOlIRtdR+0P6C3KUoTDAxVTuy3lnSXLyLKlHYJlcSU8Juge/mjeaxDNMlw9LgeIotgz5FP8eUQPhX1q10A==",
  icons: "https://fonts.googleapis.com/icon?family=Material+Icons",
  main: "../css/main.css",
}).forEach(([key, val]) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  if (key === "icons" || key == "main") {
    link.href = val;
  } else {
    link.href = `${cdnjs}${key}.min.css`;
    link.integrity = `sha512-${val}`;
    link.crossOrigin = "anonymous";
  }
  document.head.appendChild(link);
});

/* Load JavaScript dependencies. */
Object.entries({
  "Turf.js/5.1.6/turf": "siRTCNQkkHmxAwPkDt8P/TUrtxSBTSxGyD2G+uliEjS7b5uLjAPgQxIwO6JWPaTQ8doAfBHcHPMut84oNdT/2g==",
  "handlebars.js/4.7.6/handlebars.runtime": "PiK8DvgLRPC/0hHE/EydOe4k7uLCY4EW6j2xBbkQSPFoEGaG6f/6ocqRcDf3yor1X5AV88mgQIxqh2lgzmX1IA==",
  "mapbox-gl/1.11.1/mapbox-gl": "wEDb7Yk+0qUrDN00oxYEAZtDlp1vS//c1MnX2J1DoLBwPi3nyta6mnzljdbVl01c+tlcsOK9hehK/CVj1/C3FA==",
  "materialize/1.0.0/js/materialize": "NiWqa2rceHnN3Z5j6mSAvbwwg3tiwVNxiAQaaSMSXnRRDh5C2mk/+sKQRw8qjV1vN4nf8iK2a0b048PnHbyx+Q==",
  "proj4js/2.6.2/proj4": "EKjCCRjU5ClBwaRb6dGbElFNWJTE7Ek7+PlXelkum5uofPwlf6u2VRch1ty3csFCQn9XdyX89Te8jVg61qtm3Q==",
  "wicket/1.3.6/wicket": "7V9RlkyO655oDrkJ7kMXAa4Z+DS0+Kq/eXV0ZKWAv9RJtstw7rHJU1/KgpLovGZtL2FaJ9L24w3qa6L/qy3spg==",
}).forEach(([lib, sha512]) => {
  const script = document.createElement("script");
  script.src = `${cdnjs}${lib}.min.js`;
  script.integrity = `sha512-${sha512}`;
  script.crossOrigin = "anonymous";
  script.async = true;
  document.body.appendChild(script);
});

function init() {
  LoadTemplate("watercourse")
    .then(WaterCourse);
}

function ready() {
  return [
    "Handlebars",
    "M",
    "Wkt",
    "mapboxgl",
    "proj4",
    "turf",
  ].map((obj) => window.hasOwnProperty(obj)).reduce((a, b) => a && b, true);
}

const i = setInterval(() => {
  if (ready()) {
    clearInterval(i);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
}, 5);
