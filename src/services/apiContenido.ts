import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { getContenidos } from "./servicios";

export const obtenerContenidoAleatorio = async (): Promise<IContenidoAudiovisual> => {
    const contenidos = await getContenidos(); // Llama a la API
    const indice = Math.floor(Math.random() * contenidos.length);
    return contenidos[indice];
};