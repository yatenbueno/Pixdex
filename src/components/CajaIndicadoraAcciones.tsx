import { FiltrosSeleccionados } from "@/src/types/Filtros";
import React from "react";
import { TouchableOpacity } from "react-native";
import Boton from "./Boton";
import ModalFiltrar from "./ModalFiltrar";
import ModalGenerico from "./ModalGenerico";

type CajaIndicadoraAccionesProps = {
  text: string;
  filtros: FiltrosSeleccionados;
  iconSize? : number;
  setFiltros: (filtros: FiltrosSeleccionados) => void;
  modalVisible: boolean;
  setTiposSeleccionados: (tipos: number[]) => void;
  setGenerosSeleccionados: (generos: number[]) => void;
  setModalVisible: (visible: boolean) => void;
};

function CajaIndicadoraAcciones({
  text,
  filtros,
  iconSize,
  setFiltros,
  modalVisible,
  setTiposSeleccionados,
  setGenerosSeleccionados,
  setModalVisible,
}: CajaIndicadoraAccionesProps) {
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Boton
        texto={text}
        icono="settings"
        styleTexto={{ fontSize: 6.5 }}
        styleContainer={{ paddingHorizontal: 4 }}
        styleIcon={{ marginRight: 6 }}
        iconSize={iconSize}
      ></Boton>
      <ModalGenerico
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <ModalFiltrar
          filtrosIniciales={filtros}
          onCancelar={() => setModalVisible(false)}
          onAplicar={(nuevosFiltros) => {
            setFiltros(nuevosFiltros);
            setTiposSeleccionados(nuevosFiltros.tiposSeleccionados);
            setGenerosSeleccionados(nuevosFiltros.generosSeleccionados);
            setModalVisible(false); // cerrar modal
          }}
        />
      </ModalGenerico>
    </TouchableOpacity>
  );
}

export { CajaIndicadoraAcciones };

