import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onCancelar: () => void;
  onAplicar: (filtros: {
    tiposSeleccionados: number[];
    generosSeleccionados: number[];
  }) => void;
  filtrosIniciales?: {
    tiposSeleccionados: number[];
    generosSeleccionados: number[];
  };
};

const ModalFiltrar = ({ onCancelar, onAplicar, filtrosIniciales }: Props) => {
  const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>(
    filtrosIniciales?.tiposSeleccionados || []
  );
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>(
    filtrosIniciales?.generosSeleccionados || []
  );

  const toggleTipo = (id: number) => {
    setTiposSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const toggleGenero = (id: number) => {
    setGenerosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  };

  const aplicar = () => {
    onAplicar({ tiposSeleccionados, generosSeleccionados });
  };

  return (
    <View style={styles.modal}>
      <Texto style={styles.titulo}>Filtrar Contenido</Texto>

      <Texto style={styles.subtitulo}>Tipos de contenido</Texto>
      {tiposContenidoAudiovisual.map((tipo) => (
        <View key={tipo.id} style={styles.checkboxContainer}>
          <Checkbox
            value={tiposSeleccionados.includes(tipo.id)}
            onValueChange={() => toggleTipo(tipo.id)}
            color={colors.purpura}
          />
          <Text style={styles.checkboxLabel}>{tipo.singular}</Text>
        </View>
      ))}

      <Texto style={styles.subtitulo}>Generos</Texto>
      <ScrollView contentContainerStyle={styles.generosGrid}>
        {generosContenidoAudiovisual.map((genero) => (
          <View key={genero.id} style={styles.checkboxContainerGenero}>
            <Checkbox
              value={generosSeleccionados.includes(genero.id)}
              onValueChange={() => toggleGenero(genero.id)}
              color={colors.purpura}
            />
            <Text style={styles.checkboxLabel}>{genero.nombre}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.botones}>
        <TouchableOpacity
          onPress={onCancelar}
          style={[styles.boton, styles.cancelar]}
        >
          <Texto style={styles.textoBoton}>CANCELAR</Texto>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={aplicar}
          style={[styles.boton, styles.aplicar]}
        >
          <Texto style={styles.textoBoton}>APLICAR </Texto>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.fondo,
  },
  titulo: {
    fontSize: 18,
    fontFamily: "PixelFont",
    color: colors.blanco,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 13,
    color: colors.verde,
    marginTop: 10,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 5,
  },
  checkboxContainerGenero: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 15,
    marginLeft: 5,
  },
  generosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  checkboxLabel: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 10,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 11,
  },
  boton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelar: {
    backgroundColor: colors.grisOscuro,
  },
  aplicar: {
    backgroundColor: colors.purpura,
    paddingRight: 6,
  },
  textoBoton: {
    color: "white",
    fontSize: 11,
    paddingTop: 2,
  },
});

export default ModalFiltrar;
