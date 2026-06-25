"use client";

export default function FilterPanel({
  comunas,
  especies,
  selectedComunas,
  selectedEspecies,
  onToggleComuna,
  onToggleEspecie,
  onClear,
  search,
  onSearchChange,
  totalCount,
  filteredCount,
  open,
  onClose,
}: {
  comunas: string[];
  especies: string[];
  selectedComunas: Set<string>;
  selectedEspecies: Set<string>;
  onToggleComuna: (c: string) => void;
  onToggleEspecie: (e: string) => void;
  onClear: () => void;
  search: string;
  onSearchChange: (v: string) => void;
  totalCount: number;
  filteredCount: number;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={`fixed left-0 top-0 z-[900] h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl transition-transform md:relative md:z-auto md:h-full md:translate-x-0 md:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <div>
          <h1 className="text-lg font-bold text-green-800">
            Catastro Agrícola
          </h1>
          <p className="text-xs text-zinc-500">
            {filteredCount.toLocaleString("es-CL")} de{" "}
            {totalCount.toLocaleString("es-CL")} predios
          </p>
        </div>
        <button
          className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 md:hidden"
          onClick={onClose}
          aria-label="Cerrar filtros"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5 p-4">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar razón social, dirección..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
          />
        </div>

        <button
          onClick={onClear}
          className="w-full rounded-lg border border-orange-400 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50"
        >
          Limpiar filtros
        </button>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-zinc-700">
            Especie ({selectedEspecies.size || "todas"})
          </h2>
          <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-zinc-200 p-2">
            {especies.map((esp) => (
              <label
                key={esp}
                className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-green-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEspecies.has(esp)}
                  onChange={() => onToggleEspecie(esp)}
                  className="accent-green-700"
                />
                <span>{esp}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-zinc-700">
            Comuna ({selectedComunas.size || "todas"})
          </h2>
          <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-zinc-200 p-2">
            {comunas.map((com) => (
              <label
                key={com}
                className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-green-50"
              >
                <input
                  type="checkbox"
                  checked={selectedComunas.has(com)}
                  onChange={() => onToggleComuna(com)}
                  className="accent-green-700"
                />
                <span>{com}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
