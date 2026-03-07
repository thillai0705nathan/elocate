import React, { useState, useCallback } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { findShortestPath } from '../../utils/dijkstra';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const markerStyle = {
  width: '20px',
  height: '20px',
  backgroundColor: '#ff0000',
  borderRadius: '50%',
  border: '2px solid white',
  cursor: 'pointer',
};

export default function MapComponent() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);

  const handleMapClick = useCallback((event) => {
    const [lng, lat] = event.lngLat;
    if (!start) {
      setStart({ lng, lat });
    } else if (!end) {
      setEnd({ lng, lat });
    }
  }, [start, end]);

  const calculatePath = () => {
    if (!start || !end) return;
    const graph = createGridGraph(start, end);
    const result = findShortestPath(graph, 'start', 'end');
    if (result && result.path) {
      setPath(result.path.map(p => ({ lng: p[0], lat: p[1] })));
    }
  };

  const createGridGraph = (s, e) => {
    const nodes = {
      start: { x: s.lng, y: s.lat },
      end: { x: e.lng, y: e.lat },
    };
    const edges = {
      start: [{ to: 'end', weight: Math.hypot(s.lng - e.lng, s.lat - e.lat) }],
      end: [{ to: 'start', weight: Math.hypot(s.lng - e.lng, s.lat - e.lat) }],
    };
    return { nodes, edges };
  };

  return (
    <div style={{ height: '80vh' }}>
      <Map
        initialViewState={{
          longitude: start?.lng || 0,
          latitude: start?.lat || 0,
          zoom: 2,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={handleMapClick}
      >
        {start && (
          <Marker longitude={start.lng} latitude={start.lat}>
            <div style={markerStyle} title="Start" />
          </Marker>
        )}
        {end && (
          <Marker longitude={end.lng} latitude={end.lat}>
            <div style={markerStyle} title="End" />
          </Marker>
        )}
        {path.length > 1 && (
          <Source
            id="route"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: path.map(p => [p.lng, p.lat]),
              },
            }}
          >
            <Layer id="route-line" type="line" paint={{ 'line-color': '#00f', 'line-width': 4 }} />
          </Source>
        )}
      </Map>
      <div style={{ marginTop: 10 }}>
        <button onClick={calculatePath} disabled={!start || !end} style={{ padding: '8px 16px' }}>
          Calculate Shortest Path
        </button>
      </div>
    </div>
  );
}
