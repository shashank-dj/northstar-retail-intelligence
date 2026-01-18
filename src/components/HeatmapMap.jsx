import { MapContainer, TileLayer } from "react-leaflet"
import HeatLayer from "react-leaflet-heat-layer"
import "leaflet/dist/leaflet.css"

export default function HeatmapMap({ points }) {
  const center = [12.9716, 77.5946] // Bangalore center

  const heatPoints = points.map((p) => [
    p.lat,
    p.lng,
    p.recommenderScore / 100, // intensity
  ])

  return (
    <div className="mt-12 rounded-xl overflow-hidden border border-gray-800">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: "420px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer
          points={heatPoints}
          radius={30}
          blur={20}
          maxZoom={17}
        />
      </MapContainer>
    </div>
  )
}
