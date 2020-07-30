const RS = {
  bounds: [[23.01, 42.23], [18.81, 46.19]],
}
RS.centre = [
  (RS.bounds[0][0] + RS.bounds[1][0]) / 2,
  (RS.bounds[0][1] + RS.bounds[1][1]) / 2,
];

export function CreateMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXR0aWxhb2xhaCIsImEiOiJVUXVXOXBBIn0.3kVsQJB-q0rnLfbmxvM-zg';

  class FullscreenControl extends mapboxgl.FullscreenControl {
    onAdd(map) {
      const el = super.onAdd(map);
      const btn = el.querySelector("button");
      btn.firstElementChild.remove();

      ["fullscreen", "fullscreen_exit"].map((text) => {
        const i = document.createElement("i");
        i.classList.add("material-icons");
        i.classList.add(text);
        i.innerText = text;
        return i;
      }).forEach(btn.appendChild, btn);

      return el;
    }
  }

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v11",
    center: RS.centre,
    zoom: 5,
  });
  map.on("load", () => {
    map.fitBounds(RS.bounds);
  });
  map.addControl(new FullscreenControl());

  return map;
}

export function InitMap(map, data) {
  const init = () => {
    map.fitBounds(turf.bbox(data), {
      padding: 24,
    });
    map.addSource("river", {
      type: "geojson",
      data: data,
    });
    map.addLayer({
      id: "river",
      type: "line",
      source: "river",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#03a9f4",  // light-blue
        "line-width": 4,
      },
    });
  };
  if (!map.loaded()) {
    map.on("load", init);
  } else {
    init();
  }
}
