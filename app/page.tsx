"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import FilterPanel from "@/components/FilterPanel";
import ContactModal from "@/components/ContactModal";
import ExtraContactModal from "@/components/ExtraContactModal";
import { Predio, PredioAdicional } from "@/lib/types";

const CropMap = dynamic(() => import("@/components/CropMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-zinc-500">
      Cargando mapa...
    </div>
  ),
});

export default function Home() {
  const [predios, setPredios] = useState<Predio[]>([]);
  const [comunas, setComunas] = useState<string[]>([]);
  const [especies, setEspecies] = useState<string[]>([]);
  const [selectedComunas, setSelectedComunas] = useState<Set<string>>(
    new Set()
  );
  const [selectedEspecies, setSelectedEspecies] = useState<Set<string>>(
    new Set()
  );
  const [search, setSearch] = useState("");
  const [selectedPredio, setSelectedPredio] = useState<Predio | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [extraPredios, setExtraPredios] = useState<PredioAdicional[]>([]);
  const [selectedExtra, setSelectedExtra] = useState<PredioAdicional | null>(
    null
  );
  const [showExtra, setShowExtra] = useState(true);

  useEffect(() => {
    fetch("/data/predios.json")
      .then((r) => r.json())
      .then(setPredios);
    fetch("/data/comunas.json")
      .then((r) => r.json())
      .then(setComunas);
    fetch("/data/especies.json")
      .then((r) => r.json())
      .then(setEspecies);
    fetch("/data/predios_adicionales.json")
      .then((r) => r.json())
      .then(setExtraPredios);
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return predios.filter((p) => {
      if (selectedComunas.size > 0 && !selectedComunas.has(p.comuna))
        return false;
      if (selectedEspecies.size > 0 && !selectedEspecies.has(p.especie))
        return false;
      if (term) {
        const haystack = `${p.razonSocial ?? ""} ${p.direccion ?? ""} ${
          p.comuna
        }`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [predios, selectedComunas, selectedEspecies, search]);

  const toggleComuna = useCallback((c: string) => {
    setSelectedComunas((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }, []);

  const toggleEspecie = useCallback((e: string) => {
    setSelectedEspecies((prev) => {
      const next = new Set(prev);
      if (next.has(e)) next.delete(e);
      else next.add(e);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedComunas(new Set());
    setSelectedEspecies(new Set());
    setSearch("");
  }, []);

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <FilterPanel
        comunas={comunas}
        especies={especies}
        selectedComunas={selectedComunas}
        selectedEspecies={selectedEspecies}
        onToggleComuna={toggleComuna}
        onToggleEspecie={toggleEspecie}
        onClear={clearFilters}
        search={search}
        onSearchChange={setSearch}
        totalCount={predios.length}
        filteredCount={filtered.length}
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        showExtra={showExtra}
        onToggleExtra={() => setShowExtra((v) => !v)}
        extraCount={extraPredios.length}
      />

      <button
        onClick={() => setFiltersOpen(true)}
        className="absolute left-3 top-3 z-[800] rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-md md:hidden"
      >
        ☰ Filtros
      </button>

      <main className="relative flex-1">
        <CropMap
          predios={filtered}
          extraPredios={showExtra ? extraPredios : []}
          onSelect={setSelectedPredio}
          onSelectExtra={setSelectedExtra}
        />
      </main>

      {selectedPredio && (
        <ContactModal
          predio={selectedPredio}
          onClose={() => setSelectedPredio(null)}
        />
      )}

      {selectedExtra && (
        <ExtraContactModal
          predio={selectedExtra}
          onClose={() => setSelectedExtra(null)}
        />
      )}
    </div>
  );
}
