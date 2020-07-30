const RS = {
  bounds: [[23.01, 42.23], [18.81, 46.19]],
}
RS.centre = [
  (RS.bounds[0][0] + RS.bounds[1][0]) / 2,
  (RS.bounds[0][1] + RS.bounds[1][1]) / 2,
];

const styles = {
  map: "mapbox://styles/mapbox/streets-v11",
  landscape: "mapbox://styles/mapbox/outdoors-v11",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  brightness_5: "mapbox://styles/mapbox/light-v10",
  brightness_4: "mapbox://styles/mapbox/dark-v10",
};
const styleNames = {
  map: "Mapa",
  landscape: "Mapa terena",
  satellite: "Satelit",
  brightness_5: "Svetla mapa",
  brightness_4: "Tamna mapa",
};

let map = null;
let mapData = null;
let mapBounds = RS.bounds;
let mapStyle = styles.landscape;

class FitBoundsControl {
  onAdd(map) {
    const div = document.createElement("div");
    div.className = "mapboxgl-ctrl-group mapboxgl-ctrl";

    const btn = makeBtn("zoom_out_map", fitBounds);
    M.Tooltip.init(btn, {
      html: "Centriranje",
      position: "left",
      margin: 0,
    });
    div.appendChild(btn);

    return div;
  }

  getDefaultPosition() {
    return "bottom-right";
  }
}

class ChangeStyleControl {
  onAdd(map) {
    const div = document.createElement("div");
    div.className = "mapboxgl-ctrl-group mapboxgl-ctrl";

    Object.entries(styles).forEach(([icon, style]) => {
      const btn = makeBtn(icon, () => {
        if (mapStyle !== style) {
          hideData();
          map.setStyle(style);
          map.on("style.load", showData);
          mapStyle = style;
        }
      });
      M.Tooltip.init(btn, {
        html: styleNames[icon],
        position: "right",
        margin: 0,
      });
      div.appendChild(btn);
      window.MAP = map;
    });

    return div;
  }

  getDefaultPosition() {
    return "top-left";
  }
}

export function CreateMap() {
  mapboxgl.accessToken = "pk.eyJ1IjoiYXR0aWxhb2xhaCIsImEiOiJVUXVXOXBBIn0.3kVsQJB-q0rnLfbmxvM-zg";

  class FullscreenControl extends mapboxgl.FullscreenControl {
    onAdd(map) {
      const el = super.onAdd(map);
      const btn = el.querySelector("button");
      btn.firstElementChild.remove();

      ["fullscreen", "fullscreen_exit"]
        .map(makeIcon)
        .forEach(btn.appendChild, btn);

      return el;
    }
  }

  map = new mapboxgl.Map({
    container: "map",
    style: mapStyle,
    center: RS.centre,
    zoom: 5,
  });
  map.addControl(new ChangeStyleControl());
  map.addControl(new FullscreenControl());
  map.addControl(new FitBoundsControl());
  map.on("load", fitBounds);
  map.on("style.load", showData);

  return map;
}

export function InitMap(map, data) {
  const init = () => {
    mapData = data;
    showData();
    fitBounds();
    window.MAP = map;
  };
  if (!map.loaded()) {
    map.on("load", init);
  } else {
    init();
  }
}

function fitBounds() {
  if (mapData) {
    mapBounds = turf.bbox(mapData);
  }
  map.fitBounds(mapBounds, {
    padding: 48,
  });
}

function showData() {
  if (!mapData) {
    return;
  }
  if (!map.getSource("watercourse")) {
    map.addSource("watercourse", {
      type: "geojson",
      data: mapData,
    });
  }
  if (!map.getLayer("watercourse")) {
    map.addLayer({
      id: "watercourse",
      type: "line",
      source: "watercourse",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#03a9f4",  // light-blue
        "line-width": 4,
      },
    });
  }
}

function hideData() {
  if (map.getLayer("watercourse")) {
    map.removeLayer("watercourse");
  }
  if (map.getSource("watercourse")) {
    map.removeSource("watercourse");
  }
}

function makeBtn(icon, fn) {
  const btn = document.createElement("button");
  btn.appendChild(makeIcon(icon));
  btn.addEventListener("click", fn);
  return btn;
}

function makeIcon(text) {
  const icon = document.createElement("i");
  icon.className = "material-icons";
  icon.classList.add(text);
  icon.innerText = text;
  return icon;
}
