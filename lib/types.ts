export type Predio = {
  id: number;
  region: string;
  comuna: string;
  razonSocial: string | null;
  direccion: string | null;
  referencia: string | null;
  rol: string | null;
  celular: string | null;
  mail: string | null;
  especie: string;
  haPlantada: number | null;
  haTotal: number | null;
  lat: number;
  lon: number;
};

export type PredioAdicional = {
  id: number;
  razonSocial: string;
  lat: number;
  lon: number;
  comuna: string | null;
  region: string | null;
  mapsUrl: string | null;
};
