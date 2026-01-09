import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leafletIconFix";

/* Fly animation component */
const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(position, 12, {
      animate: true,
      duration: 1.2,
    });
  }, [position, map]);

  return null;
};

const Coverage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [search, setSearch] = useState("");

  const markerRefs = useRef({});

  /* Fetch data once */
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setWarehouses(data));
  }, []);

  /* PURE filtering only */
  const filtered = useMemo(() => {
    if (!search.trim()) return warehouses;

    const key = search.toLowerCase();

    return warehouses.filter(
      (w) =>
        w.region.toLowerCase().includes(key) ||
        w.district.toLowerCase().includes(key) ||
        w.city.toLowerCase().includes(key) ||
        w.covered_area.some((a) => a.toLowerCase().includes(key))
    );
  }, [search, warehouses]);

  /* Derive activeWarehouse */
  const activeWarehouse =
    search.trim() && filtered.length > 0 ? filtered[0] : null;

  /* Open popup after a small delay */
  useEffect(() => {
    if (!activeWarehouse) return;

    const timer = setTimeout(() => {
      markerRefs.current[activeWarehouse.id]?.openPopup();
    }, 900);

    return () => clearTimeout(timer);
  }, [activeWarehouse]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          We are available in 64 districts
        </h2>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-xl">
          <input
            className="input input-bordered w-full"
            placeholder="Search district, city or area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary text-black">Search</button>
        </div>


        {filtered.length === 0 && (
          <p className="text-center text-gray-500 my-6">
            No service coverage found.
          </p>
        )}

        {/* Map */}
        <div className="w-full h-80 md:h-105 lg:h-130 xl:h-200  overflow-hidden shadow relative">

          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            className="w-full h-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {activeWarehouse && (
              <FlyToLocation
                position={[activeWarehouse.latitude, activeWarehouse.longitude]}
              />
            )}

            {filtered.map((w, index) => (
              <Marker
                key={index}
                position={[w.latitude, w.longitude]}
                ref={(ref) => {
                  if (ref) markerRefs.current[w.id] = ref;
                }}
              >
                <Popup autoClose={false} closeOnClick={false}>
                  <div className="text-xs">
                    <p className="font-semibold">{w.district}</p>
                    <p>City: {w.city}</p>
                    <p className="font-medium">Covered Areas:</p>
                    <ul className="list-disc list-inside">
                      {w.covered_area.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
