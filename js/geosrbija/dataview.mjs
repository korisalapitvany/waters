import layers from "./layers.mjs";

const endpoint = "https://a3.geosrbija.rs/WebServices/client/DataView.asmx";

export function ReadAny(layerID, objectID) {
  const layer = layers[layerID];
  if (!layer) {
    throw new Error(`Unknown layer: ${JSON.stringify(layerID)}.`);
  }
  return fetch(`${endpoint}/ReadAny`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      request: {
        editable: false,
        theme_uuid: layer.themeUUID,
        columns: layer.columns,
        object_id: objectID.toString(),
        map_dictionaries: true,
      },
    }),
    mode: "cors",
    credentials: "omit",
  })
  .then(response => response.json())
  .then(data => {
    if (!(data && data.d)) {
      throw new Error("No data received.");
    }
    if (data.d.exceptions && data.d.exceptions.length > 0) {
      throw new Error(`Exceptions in response: ${JSON.stringify(data.d.exceptions)}`);
    }
    return data.d.records || [];
  });
}
