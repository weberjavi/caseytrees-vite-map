import { useEffect } from "react";
import styles from "./map.module.css";
import { Map } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";

export default function App() {
  useEffect(() => {
    const protocol =  new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      <Map
        initialViewState={{
          longitude: -77.01047,
          latitude: 38.91825,
          zoom: 14,
        }}
        mapStyle={{
          version: 8,
          sources: {
            sample: {
              type: "vector",
              url:
                "pmtiles://https://r2-public.protomaps.com/protomaps-sample-datasets/cb_2018_us_zcta510_500k.pmtiles"
            },
            trees: {
                    type: "vector",
                    url: "pmtiles://https://raw.githubusercontent.com/weberjavi/caseytrees-map-demo/main/urban_forestry_street_trees.pmtiles",
                  },
          },
          layers: [
            {
              id: "zcta",
              source: "sample",
              "source-layer": "zcta",
              type: "line",
              paint: {
                "line-color": "#999"
              }
            },
            {
              id: "trees",
              source: "trees",
              "source-layer": "Urban_Forestry_Street_Trees",
              type: "circle",
              paint: {
                "circle-radius": 5,
                "circle-color": "#00dd00",
              }
            }
          ]
        }}
        mapLib={maplibregl}
      />
    </div>
  );
}