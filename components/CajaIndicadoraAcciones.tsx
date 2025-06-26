import { FiltrosSeleccionados } from "@/src/types/Filtros";
import React from "react";
import { TouchableOpacity } from "react-native";
import Boton from "./Boton";
import ModalFiltrar from "./ModalFiltrar";
import ModalGenerico from "./ModalGenerico";

type CajaIndicadoraAccionesProps = {
  text: string;
  filtros: FiltrosSeleccionados;
  setFiltros: (filtros: FiltrosSeleccionados) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

function CajaIndicadoraAcciones({
  text,
  filtros,
  setFiltros,
  modalVisible,
  setModalVisible,
}: CajaIndicadoraAccionesProps) {
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Boton
        texto={text}
        icono="settings"
        styleTexto={{ fontSize: 10 }}
        styleContainer={{ paddingHorizontal: 4 }}
        styleIcon={{ marginRight: 6 }}
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
            setModalVisible(false);
          }}
        />
      </ModalGenerico>
    </TouchableOpacity>
  );
}

export { CajaIndicadoraAcciones };
