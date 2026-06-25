"use client";

import { PredioAdicional } from "@/lib/types";

export default function ExtraContactModal({
  predio,
  onClose,
}: {
  predio: PredioAdicional;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-zinc-600 to-zinc-800 px-5 py-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wide opacity-90">
            Predio sin especie registrada
          </p>
        </div>

        <div className="space-y-4 bg-zinc-50 px-5 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Razón Social
            </p>
            <p className="text-base font-bold text-zinc-900">
              {predio.razonSocial}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Comuna
              </p>
              <p className="text-zinc-900">{predio.comuna ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Región
              </p>
              <p className="text-zinc-900">{predio.region ?? "—"}</p>
            </div>
          </div>

          {predio.mapsUrl && (
            <a
              href={predio.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block rounded-full border border-zinc-500 px-3 py-1 text-sm text-zinc-700"
            >
              📍 Ver en Google Maps
            </a>
          )}
        </div>

        <button
          onClick={onClose}
          className="block w-full bg-zinc-700 py-3 text-center font-medium text-white hover:bg-zinc-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
