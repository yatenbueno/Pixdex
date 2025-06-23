
export interface ITipoContenidoAudiovisual {
    id: number;
    singular: string;
    plural: string;
  }
  
  export const tiposContenidoAudiovisual: ITipoContenidoAudiovisual[] = [
    { id: 1, singular: "Serie", plural: "Series" },
    { id: 2, singular: "Película", plural: "Películas" },
    { id: 3, singular: "Anime", plural: "Animes" },
  ] as const;
  