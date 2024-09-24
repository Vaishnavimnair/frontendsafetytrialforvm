import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, map, marker, tileLayer, Marker } from 'leaflet';
@Component({
  selector: 'app-safety',
  standalone: true,
  imports: [],
  templateUrl: './safety.component.html',
  styleUrl: './safety.component.css'
})
export class SafetyComponent implements OnInit {

  weatherInfo: any;
  mapPoints: any[] = [];
  map: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize map when the component loads
    this.initMap();
  }

  getSafetyInfo(latitude: number, longitude: number) {
    // Make HTTP call to backend safety service
    this.http.get<any>(`http://localhost:8080/api/safety?latitude=${latitude}&longitude=${longitude}`)
      .subscribe(response => {
        this.weatherInfo = response.weatherInfo;
        this.mapPoints = response.mapPoints;
        
        // After fetching the data, add points to the map
        this.addPointsToMap();
      });
  }

  // Initialize the Leaflet map
  initMap() {
    this.map = map('map').setView([40.7128, -74.0060], 12); // Default to New York City
    
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // Add hospitals and police stations to the map
  addPointsToMap() {
    // Clear existing markers (if needed)
    this.map.eachLayer((layer: any) => {
      if (layer instanceof Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Add markers for each point
    this.mapPoints.forEach(point => {
      const newMarker = marker([point.latitude, point.longitude])
        .bindPopup(`${point.name} (${point.type})`)
        .addTo(this.map);
    });

    // Center map on the first point
    if (this.mapPoints.length > 0) {
      this.map.setView([this.mapPoints[0].latitude, this.mapPoints[0].longitude], 12);
    }
  }
}