import { API_URL } from "@/src/common/constants/API_URL";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

export async function getContenidos(): Promise<IContenidoAudiovisual[]> {
  const responseContenidos = await fetch(`${API_URL}/contenidos`);
  if (!responseContenidos.ok) {
    throw new Error("Error al obtener contenidos");
  }
  const contenidos: IContenidoAudiovisual[] = await responseContenidos.json();
  return contenidos;
}

export async function getTipos(): Promise<ITipoContenidoAudiovisual[]> {
  const responseTipos = await fetch(`${API_URL}/tipos`);
  if (!responseTipos.ok) {
    throw new Error("Error al obtener tipos");
  }
  const tipos: ITipoContenidoAudiovisual[] = await responseTipos.json();
  return tipos;
}

export async function getGeneros(): Promise<IGeneroContenidoAudiovisual[]> {
  const responseGeneros = await fetch(`${API_URL}/generos`);
  if (!responseGeneros.ok) {
    throw new Error("Error al obtener generos");
  }
  const generos: IGeneroContenidoAudiovisual[] = await responseGeneros.json();
  return generos;
}

export type ITiposDict = Record<number, ITipoContenidoAudiovisual>;