"use client";

import { Predio } from "@/lib/types";

export default function ContactModal({
  predio,
  onClose,
}: {
  predio: Predio;
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
        <div className="bg-gradient-to-r from-orange-500 to-green-700 px-5 py-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wide opacity-90">
            Contacto
          </p>
          <p className="text-sm opacity-90">ROL: {predio.rol ?? "—"}</p>
        </div>

        <div className="space-y-4 bg-green-50 px-5 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Razón Social
            </p>
            <p className="text-base font-bold text-zinc-900">
              {predio.razonSocial ?? "Sin información"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Fonos Móviles
            </p>
            {predio.celular ? (
              <a
                href={`tel:${predio.celular}`}
                className="mt-1 inline-block rounded-full border border-green-700 px-3 py-1 text-sm text-green-800"
              >
                📞 {predio.celular}
              </a>
            ) : (
              <p className="text-sm text-zinc-500">Sin información</p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Emails
            </p>
            {predio.mail ? (
              <a
                href={`mailto:${predio.mail}`}
                className="mt-1 inline-block break-all rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600"
              >
                ✉️ {predio.mail}
              </a>
            ) : (
              <p className="text-sm text-zinc-500">Sin información</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Especie
              </p>
              <p className="text-zinc-900">{predio.especie}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Comuna
              </p>
              <p className="text-zinc-900">{predio.comuna}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Ha plantada
              </p>
              <p className="text-zinc-900">{predio.haPlantada ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Ha total
              </p>
              <p className="text-zinc-900">{predio.haTotal ?? "—"}</p>
            </div>
          </div>

          {predio.direccion && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Dirección
              </p>
              <p className="text-sm text-zinc-900">
                {predio.direccion}
                {predio.referencia ? ` — ${predio.referencia}` : ""}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="block w-full bg-green-700 py-3 text-center font-medium text-white hover:bg-green-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
