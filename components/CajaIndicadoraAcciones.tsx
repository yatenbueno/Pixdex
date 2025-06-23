import colors from "@/constants/Colors";
import { FiltrosSeleccionados } from "@/src/types/Filtros";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalFiltrar from "./ModalFiltrar";
import ModalGenerico from "./ModalGenerico";
import Boton from "./Boton";

type CajaIndicadoraAccionesProps = {
  text: string;
  filtros: FiltrosSeleccionados;
  setFiltros: (filtros: FiltrosSeleccionados) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

function CajaIndicadoraAcciones({ text, filtros, setFiltros, modalVisible, setModalVisible }: CajaIndicadoraAccionesProps) {
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.button}>
        <Feather name="settings" size={14} color="white" style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
      {/* <Boton texto="BACK" icono="settings"></Boton> */}
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

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purpura,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 10,
    color: "white",
    fontFamily: "PixelFont",
    paddingTop: 5,
  },
});

export { CajaIndicadoraAcciones };

