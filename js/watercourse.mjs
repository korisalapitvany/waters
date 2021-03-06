import layers from "./geosrbija/layers.mjs";
import { ReadAny } from "./geosrbija/dataview.mjs";
import { CreateMap, InitMap } from "./watercourse/map.mjs";

const slug = location.pathname.split(/\/+/).filter((segment) => segment).pop();

const ETRS89 = (() => {
  let p = null;
  return () => {
    if (p === null) {
      p = proj4("+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"); 
    }
    return p;
  };
})();

const typos = {
  Vestacki: "Veštački",
  "Vodotoci I reda": "Vodotoci Ⅰ reda",
}

export default function WaterCourse(template) {
  const ids = getIDs();
  loadTemplate(ids, template);

  const rgzTable = document.getElementById("data-rgz");
  const rgzHeader = rgzTable.querySelector("thead");
  const rgzBody = rgzTable.querySelector("tbody");
  const rgzProgress = rgzHeader.querySelector(".progress");
  const rgzProgressBar = rgzProgress.firstElementChild;
  rgzProgress.parentElement.colSpan = layers[129].columns.length;

  const geoTable = document.getElementById("data-geo");
  const geoHeader = geoTable.querySelector("thead");
  const geoBody = geoTable.querySelector("tbody");
  const geoProgress = geoHeader.querySelector(".progress");
  const geoProgressBar = geoProgress.firstElementChild;
  geoProgress.parentElement.colSpan = layers[129].columns.length;

  const map = CreateMap();
  const mapData = {
    type: "FeatureCollection",
    features: [],
    properties: {id: slug},
  };

  let pending = ids.length;
  ids.forEach((id) => {
    ReadAny(129, id).then((records) => {
      pending--;
      rgzProgressBar.className = "determinate";
      rgzProgressBar.style.width = `${
        Math.ceil((1 - pending/ids.length) * 100)
      }%`;
      geoProgressBar.className = "determinate";
      geoProgressBar.style.width = `${
        Math.ceil((1 - pending/ids.length) * 100)
      }%`;

      const record = records[0];
      if (!record) {
        throw new Error("No data received from server.");
      }

      const geoJSON = new Wkt.Wkt(record.geom_wkt).toJson();
      geoJSON.coordinates = geoJSON.coordinates.map(c => ETRS89().inverse(c));

      mapData.features.push({
        type: "Feature",
        properties: {
          id: id,
        },
        geometry: geoJSON,
      });

      let delay = 0;
      Object.entries(record)
        .sort(() => Math.random()> 0.5)
        .forEach(([key, value]) => {
          const td = rgzBody.querySelector(`tr[data-id="${id}"]>td[data-key="${key}"]`);
          if (!td) {
            return
          }
          td.innerText = typos[value] || value;
          doneLoading(td, delay);
          delay += 50;
      });

      addCopyCell(
        geoBody.querySelector(`tr[data-id="${id}"]>td[data-key="wkt"]`),
        record.geom_wkt.replace(/\(.*\)/, "(…)"),
        record.geom_wkt,
        50);
      addCopyCell(
        geoBody.querySelector(`tr[data-id="${id}"]>td[data-key="geo_json"]`),
        `${geoJSON.type}{${geoJSON.coordinates.length}}`,
        JSON.stringify(geoJSON),
        100);
      {
        const td = geoBody.querySelector(`tr[data-id="${id}"]>td[data-key="distance"]`);
        td.className = "right-align";
        td.innerText = `${
          turf.distance(turf.point(geoJSON.coordinates[0]),
                        turf.point(geoJSON.coordinates[geoJSON.coordinates.length-1]))
            .toFixed(2)
        } km`;
        doneLoading(td, delay);
        delay += 50;
      }
      {
        const td = geoBody.querySelector(`tr[data-id="${id}"]>td[data-key="length"]`);
        td.className = "right-align";
        td.innerText = `${turf.length(geoJSON).toFixed(2)} km`;
        doneLoading(td, delay);
        delay += 50;
      }

      if (pending === 0) {
        sortByLinkage(mapData);
        InitMap(map, mapData);
        showStats(mapData);
        initDlButtons(mapData);
      }
    });
  });
}

function getIDs() {
  return JSON.parse(document.getElementById("rgz-ids").innerText)
    .sort((a, b) => a - b);
}

function loadTemplate(ids, template) {
  document.getElementById("content").innerHTML = template({
    rgz_ids: ids,
    rgz_ids_text: ids.join(", ").replace(/,\s([^,]+)$/, " i $1"),
    title: document.title,
    columns: layers[129].columns,
    slug: slug,
  });
}

function sortByLinkage(geoJSON) {
  if (geoJSON.features.length <= 1) {
    return;
  }
  const links = {};
  geoJSON.features.forEach((a) => {
    geoJSON.features.forEach((b) => {
      if (a !== b &&
          turf.booleanEqual(turf.point(a.geometry.coordinates[a.geometry.coordinates.length-1]),
                            turf.point(b.geometry.coordinates[0]))) {
        links[a.properties.id] = b.properties.id;
      }
    });
  });

  let last = Object.values(links).filter((id) => !links.hasOwnProperty(id)).pop().toString();
  const inverse = Object.fromEntries(Object.entries(links).map(a => a.reverse()));
  const reverse = [last];
  while (inverse.hasOwnProperty(last)) {
    last = inverse[last];
    reverse.push(last);
  }
  const ids = reverse.reverse().map((id) => parseInt(id, 10));

  // Re-order GeoJSON features.
  geoJSON.features.sort((a, b) => ids.indexOf(a.properties.id) - ids.indexOf(b.properties.id));
}

function toLineString(geoJSON) {
  return turf.lineString(
    toCoordinates(geoJSON)
      .reduce((a, b) => a.concat(b), []));
}

function toMultiLineString(geoJSON) {
  return turf.multiLineString(toCoordinates(geoJSON));
}

function toCoordinates(geoJSON) {
  return geoJSON.features
    .map((feature) => feature.geometry.coordinates);
}


function showStats(geoJSON) {
  showOrdering(geoJSON);
  showDistance(geoJSON);
  showLength(geoJSON);
}

function initDlButtons(geoJSON) {
  Object.entries({
    "dl-feature-collection-line-string": geoJSON,
    "dl-feature-multi-line-string": toMultiLineString(geoJSON),
    "dl-feature-line-string": toLineString(geoJSON),
  }).forEach(([id, data]) => {
    const btn = document.getElementById(id);
    btn.href = `data:text/plain;charset=utf-8,${
      encodeURIComponent(JSON.stringify(data))
    }`;
    btn.download = `${geoJSON.properties.id}.geo.json`;
  });
}

function showOrdering(geoJSON) {
  const ul = document.getElementById("ordering");
  ul.firstElementChild.remove();
  geoJSON.features.map((feature) => feature.properties.id).forEach((id) => {
    const li = document.createElement("li");
    li.innerText = id;
    ul.appendChild(li);
  });
}

function showDistance(geoJSON) {
  const firstLine = geoJSON.features[0].geometry;
  const lastLine = geoJSON.features[geoJSON.features.length-1].geometry;
  document.getElementById("distance").innerText = `${
    turf.distance(turf.point(firstLine.coordinates[0]),
                  turf.point(lastLine.coordinates[lastLine.coordinates.length-1]))
      .toFixed(2)
  } km`;
}

function showLength(geoJSON) {
  const distance = geoJSON.features
    .map((feature) => feature.geometry)
    .reduce((sum, geometry) => turf.length(geometry) + sum, 0);
  document.getElementById("length").innerText = `${
    distance.toFixed(2)
  } km`;
}

function addCopyCell(td, abbrev, text, delay) {
  if (navigator.clipboard) {
    const span = document.createElement("span");
    span.innerText = abbrev;
    span.className = "copy";
    const tooltip = M.Tooltip.init(span, {
      html: "Kopiraj",
      position: "right",
      margin: 0,
    });
    const copy = document.createElement("i");
    copy.className = "material-icons";
    copy.innerText = "content_copy";
    span.innerText += " ";
    span.appendChild(copy);
    span.addEventListener("click", () => {
      navigator.clipboard.writeText(text);
      tooltip.tooltipEl.querySelector(".tooltip-content").innerText = "Kopirano!";
      copy.innerText = "done";
      span.addEventListener("mouseleave", () => {
        copy.innerText = "content_copy";
      });
    });
    td.appendChild(span);
  } else {
    td.innerText = abbrev;
  }
  doneLoading(td, delay);
}

function doneLoading(el, delay) {
  setTimeout(() => {
    el.classList.remove("loading");
  }, delay);
}
