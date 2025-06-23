import colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CajaCategoriaFlatListProps = {
  text: string;
  children?: React.ReactNode;
};

function CajaCategoriaFlatList({ text, children }: CajaCategoriaFlatListProps) {
  return (
    <View style={styles.wrapper}>
      {/* Contenedor con borde */}
      <View style={styles.borderedBox}>
        {/* Título flotante */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{text}</Text>
        </View>

        {/* Contenido dentro (ej. FlatList) */}
        <View style={styles.innerContent}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  borderedBox: {
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    backgroundColor: colors.fondo,
    paddingTop: 20,
    position: "relative",
  },
  titleWrapper: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: colors.purpura,
    paddingHorizontal: 10,
    paddingTop: 5,
    borderWidth: 2,
    borderColor: colors.purpuraClaro,
    zIndex: 1,
  },
  title: {
    color: "white",
    fontFamily: "PixelFont",
    fontSize: 7,
  },
  innerContent: {
    paddingHorizontal: 10,
    /*esto es para que no haya espacio entre 
      el fin de la carta y el fin de la caja bordeada de
      la flatlist */
    marginBottom: -25,
  },
});

export { CajaCategoriaFlatList };

