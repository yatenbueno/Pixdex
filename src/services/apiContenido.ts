import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";

export const obtenerContenidoAleatorio = (): Promise<ContenidoAudiovisual> => {
  return new Promise((resolve) => {
    const indiceAleatorio = Math.floor(Math.random() * contenidosAudiovisuales.length);
    setTimeout(() => {
      resolve(contenidosAudiovisuales[indiceAleatorio]);
    }, 500); // Simula delay de red
  });
};
