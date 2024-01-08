import React, { useEffect, useRef } from 'react';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch'; // Remove GeoSearchControl import
import { Direccion } from '../../context/interfaces/interfaces';

interface MapProps {
  direccion: Direccion;
  id: number;
}

const MapLocation: React.FC<MapProps> = ({ direccion, id }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const mapContainerId = `map-${id}`;
    const mapContainer = document.getElementById(mapContainerId);

    if (!mapContainer) {
      console.error(`Map container with id ${mapContainerId} not found.`);
      return;
    }

    if (!mapRef.current) {
      const direccionString = `${direccion.nroCasa} ${direccion.calle}, Luján de Cuyo, Mendoza, Argentina`;

      // Create a new map instance
      const map = L.map(mapContainerId).setView([0, 0] as LatLngTuple, 13);

      // Add a base map layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Create an empty marker layer
      const markers = L.layerGroup().addTo(map);

      // Function to handle geocoding and marker placement
      const onGeocode = (results: any) => {
        if (results && results.length > 0 && results[0].y && results[0].x) {
          const { y: lat, x: lon } = results[0];
          const latlng: LatLngTuple = [lat, lon];

          // Clear previous markers
          markers.clearLayers();

          // Add new marker
          const marker = L.marker(latlng).addTo(markers);
          marker.bindPopup(direccionString).openPopup();
          map.setView(latlng, 13);
        } else {
          console.error('Location not found or location information is missing');
        }
      };

      // Perform geocoding
      const provider = new OpenStreetMapProvider();
      provider.search({ query: direccionString }).then(onGeocode);

      // Save the map instance in the ref
      mapRef.current = map;
    }
  }, [direccion, id]);

  return <div id={`map-${id}`} style={{ width: '100%', height: '200px' }} />;
};

export default MapLocation;
