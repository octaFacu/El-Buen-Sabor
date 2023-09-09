import React, { useEffect } from "react";
import { Direccion } from "../../context/models/interfaces";
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';

interface MapProps {
    direccion: Direccion;
    id: number;
}

const MapLocation: React.FC<MapProps> = ({ direccion, id }) => {
    useEffect(() => {
        const mapContainerId = `map-${id}`; // Create a unique ID based on the 'id' prop

        const mapContainer = document.getElementById(mapContainerId);
        mapContainer!.innerHTML = '';

        var direccionString = `${direccion.nroCasa} ${direccion.calle}, Lujan de Cuyo, Mendoza, Argentina`;
        
        // Create the map when the component mounts
        const map = L.map(mapContainerId).setView([0, 0] as LatLngTuple, 13); // Adjust the initial zoom level
    
        // Add a base map layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    
        // Use Nominatim to geocode the address and add a marker
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionString)}`;
    
        fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const latlng: LatLngTuple = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                    const marker = L.marker(latlng).addTo(map);
                    marker.bindPopup(direccionString).openPopup();
                    map.setView(latlng, 13);
                } else {
                    console.error('Location not found');
                }
            })
            .catch((error) => console.error(error));
    }, [direccion, id]);
    
    return <div id={`map-${id}`} style={{ width: '100%', height: '200px' }} />;
};

export default MapLocation;



