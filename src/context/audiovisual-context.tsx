// @ts-nocheck
import { createContext, useState } from "react";
import { IGeneroContenidoAudiovisual } from "../data/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual } from "../data/tiposContenidoAudiovisual";

interface IAudiovisualesContext {
  tipos: ITipoContenidoAudiovisual[];
  generos: IGeneroContenidoAudiovisual[];
  contenidos: IContenidoAudiovisual[];
  selectedTipoId: number | null;
  selectedGeneroId: number | null;
  setTipos: (tipos: ITipoContenidoAudiovisual[]) => void;
  setGeneros: (generos: IGeneroContenidoAudiovisual[]) => void;
  setContenidos: (contenidos: IContenidoAudiovisual[]) => void;
  setSelectedTipoId: (tipoId: number | null) => void;
  setSelectedGeneroId: (generoId: number | null) => void;
}

export const AudiovisualesContext = createContext<IAudiovisualesContext>(null);

export function AudiovisualesContextProvider({ children }) {
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
  const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
  const [selectedTipoId, setSelectedTipoId] = useState<number | null>(null);
  const [selectedGeneroId, setSelectedGeneroId] = useState<number | null>(null);

  return (
    <AudiovisualesContext.Provider
      value={{
        tipos,
        generos,
        contenidos,
        selectedTipoId,
        selectedGeneroId,
        setGeneros,
        setTipos,
        setContenidos,
        setSelectedTipoId,
        setSelectedGeneroId,
      }}
    >
      {children}
    </AudiovisualesContext.Provider>
  );
}
