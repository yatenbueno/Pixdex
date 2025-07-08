import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

type BotonProps = {
  texto: string;
  icono?: string;
  iconSize?: number;
  iconColor?: string;
  styleIcon?: TextStyle;
  styleContainer?: ViewStyle;
  styleTexto?: TextStyle;
};

const Boton = ({
  texto,
  icono,
  iconSize = 18,
  iconColor = "white",
  styleIcon,
  styleContainer,
  styleTexto,
}: BotonProps) => {
  const iconProps = { name: icono as any, size: iconSize, color: iconColor };

  return (
    <View style={styles.botones}>
      <View style={[styles.boton, styleContainer]}>
        <View style={styles.contenido}>
          <Ionicons {...iconProps} style={styleIcon} />
          <Texto style={[styles.texto, styleTexto]}>{texto}</Texto>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  boton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: colors.purpura,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
    borderBottomColor: colors.purpuraOscuro,
  },
  contenido: {
    flexDirection: "row",
    alignContent: "center",
  },
  icono: {
    marginRight: 6,
    paddingLeft: 6,
  },
  texto: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginTop: 3,
    paddingRight: 5,
  },
});

export default Boton;
