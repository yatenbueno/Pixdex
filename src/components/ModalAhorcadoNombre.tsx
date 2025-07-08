import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Boton from "./Boton";

type AhorcadoProps = {
  onStart: (valor: string) => void;
  texto?: string;
  textoBoton: string;
  placeHolder: string;
  valorDefault?: string;
};

const ModalAhorcado = ({
  onStart,
  texto,
  textoBoton,
  placeHolder,
  valorDefault = "",
}: AhorcadoProps) => {
  const [valor, setValor] = useState(valorDefault);

  const handlePress = () => {
    if (valor.trim()) {
      onStart(valor.trim());
    }
  };

  return (
    <View style={styles.modal}>
      <Texto style={styles.titulo}>{texto}</Texto>

      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="#aaa"
        value={valor}
        onChangeText={setValor}
      />
      <View style={styles.boton}>
        <TouchableOpacity onPress={handlePress}>
          <Boton texto={textoBoton}></Boton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.fondo,
    padding: 20,
    borderRadius: 12,
  },
  titulo: {
    fontSize: 14,
    fontFamily: "PixelFont",
    color: colors.blanco,
    textAlign: "left",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#111",
    color: "white",
    borderWidth: 1,
    borderColor: colors.purpura,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    width: "100%",
    marginBottom: 20,
  },
  boton: {
    alignSelf: "flex-end",
  },
});

export default ModalAhorcado;
