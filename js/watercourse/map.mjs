const RS = {
  bounds: [[23.01, 42.23], [18.81, 46.19]],
}
RS.centre = [
  (RS.bounds[0][0] + RS.bounds[1][0]) / 2,
  (RS.bounds[0][1] + RS.bounds[1][1]) / 2,
];

let map = null;
let bounds = RS.bounds;

function fitBounds() {
  map.fitBounds(bounds, {
    padding: 24,
  });
}

export function CreateMap() {
  mapboxgl.accessToken = "pk.eyJ1IjoiYXR0aWxhb2xhaCIsImEiOiJVUXVXOXBBIn0.3kVsQJB-q0rnLfbmxvM-zg";

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

  class FitBoundsControl {
    onAdd(map) {
      this._map = map;

      this._container = document.createElement("div");
      this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";

      const btn = document.createElement("button");
      btn.addEventListener("click", fitBounds);
      this._container.appendChild(btn);

      const i = document.createElement("i");
      i.className = "material-icons fit";
      i.innerText = "zoom_out_map";
      btn.appendChild(i);

      return this._container;
    }

    onRemove() {
      this._map = undefined;
      this._container.parentNode.removeChild(this._container);
    }

    getDefaultPosition() {
      return "bottom-right";
    }
  }

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v11",
    center: RS.centre,
    zoom: 5,
  });
  map.addControl(new FullscreenControl());
  map.addControl(new FitBoundsControl());
  map.on("load", fitBounds);

  return map;
}

export function InitMap(map, data) {
  const init = () => {
    bounds = turf.bbox(data);
    fitBounds();
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
