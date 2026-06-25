"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import { Predio, PredioAdicional } from "@/lib/types";

const ESPECIE_COLORS: Record<string, string> = {
  CEREZO: "#e11d48",
  PALTO: "#16a34a",
  "VID DE MESA": "#7c3aed",
  NOGAL: "#92400e",
  ALMENDRO: "#b45309",
};

function colorFor(especie: string): string {
  return ESPECIE_COLORS[especie] ?? "#ea580c";
}

function makeIcon(especie: string) {
  const color = colorFor(especie);
  return L.divIcon({
    className: "predio-pin",
    html: `<div style="background:${color}" class="predio-pin-dot"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const EXTRA_ICON = L.divIcon({
  className: "predio-pin",
  html: `<div class="predio-pin-dot predio-pin-extra"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export default function CropMap({
  predios,
  extraPredios,
  onSelect,
  onSelectExtra,
}: {
  predios: Predio[];
  extraPredios?: PredioAdicional[];
  onSelect: (p: Predio) => void;
  onSelectExtra?: (p: PredioAdicional) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const extraClusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-34.4, -71.1],
      zoom: 9,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    clusterRef.current = L.markerClusterGroup({
      maxClusterRadius: 50,
      disableClusteringAtZoom: 15,
    });
    extraClusterRef.current = L.markerClusterGroup({
      maxClusterRadius: 50,
      disableClusteringAtZoom: 15,
    });
    map.addLayer(clusterRef.current);
    map.addLayer(extraClusterRef.current);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;

    cluster.clearLayers();

    const markers = predios.map((p) => {
      const marker = L.marker([p.lat, p.lon], { icon: makeIcon(p.especie) });
      marker.bindTooltip(
        `<b>${p.especie}</b><br>${p.razonSocial ?? ""}<br>${p.comuna}`
      );
      marker.on("click", () => onSelect(p));
      return marker;
    });

    cluster.addLayers(markers);
  }, [predios, onSelect]);

  useEffect(() => {
    const cluster = extraClusterRef.current;
    if (!cluster) return;

    cluster.clearLayers();

    const markers = (extraPredios ?? []).map((p) => {
      const marker = L.marker([p.lat, p.lon], { icon: EXTRA_ICON });
      marker.bindTooltip(`<b>${p.razonSocial}</b><br>${p.comuna ?? ""}`);
      marker.on("click", () => onSelectExtra?.(p));
      return marker;
    });

    cluster.addLayers(markers);
  }, [extraPredios, onSelectExtra]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}
