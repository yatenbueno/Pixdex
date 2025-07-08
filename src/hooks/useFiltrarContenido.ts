// src/hooks/useFiltrarContenido.ts
import { useMemo } from "react";

type Contenido = {
  id: number;
  nombre: string;
  descripcion: string;
  generos: number[];
  tipoId: number;
  imageUrl: string;
};

type Filtros = {
  tiposSeleccionados: number[];
  generosSeleccionados: number[];
};

export function useFiltrarContenido(contenidos: Contenido[], filtros: Filtros) {
  const filtrados = useMemo(() => {
    return contenidos.filter((contenido) => {
      const coincideTipo =
        filtros.tiposSeleccionados.length === 0 ||
        filtros.tiposSeleccionados.includes(contenido.tipoId);

      const coincideGenero =
        filtros.generosSeleccionados.length === 0 ||
        contenido.generos.some((g) => filtros.generosSeleccionados.includes(g));

      return coincideTipo && coincideGenero;
    });
  }, [contenidos, filtros]);

  return filtrados;
}
