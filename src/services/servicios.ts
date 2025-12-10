import { API_URL } from "@/src/common/constants/API_URL";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

// Función auxiliar para simular demora
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getContenidos(): Promise<IContenidoAudiovisual[]> {
  await delay(1500); // Descomenta si quieres probar el loading
  const response = await fetch(`${API_URL}/contenidos`);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener contenidos`);
  }

  const data = await response.json();
  return data;
}

export async function getGeneros(): Promise<IGeneroContenidoAudiovisual[]> {
  const response = await fetch(`${API_URL}/generos`);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener géneros`);
  }

  return await response.json();
}

export async function getTipos(): Promise<ITipoContenidoAudiovisual[]> {
  const response = await fetch(`${API_URL}/tipos`);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener tipos`);
  }

  return await response.json();
}
