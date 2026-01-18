import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.heat"
import { useEffect } from "react"

function HeatLayer({ points }) {
  const map = useMap()

  useEffect(() => {
    if (!map || points.length === 0) return

    const heatPoints = points.map((p) => [
      p.lat,
      p.lng,
      p.recommenderScore / 100,
    ])

    const heat = L.heatLayer(heatPoints, {
      radius: 30,
      blur: 20,
      maxZoom: 17,
    })

    heat.addTo(map)

    return () => {
      map.removeLayer(heat)
    }
  }, [map, points])

  return null
}

export default function HeatmapMap({ points }) {
  return (
    <div className="mt-12 rounded-xl overflow-hidden border border-gray-800">
      <MapContainer
        center={[12.9716, 77.5946]} // Bangalore
        zoom={11}
        style={{ height: "420px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer points={points} />
      </MapContainer>
    </div>
  )
}
