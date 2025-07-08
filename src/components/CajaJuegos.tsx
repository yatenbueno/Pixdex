import colors from "@/src/common/constants/Colors";
import { ROUTES } from "@/src/navigation/routes";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CajaJuegosProps = {
  backgroundColor: string;
  text: string;
  descripcion: string;
};

function CajaJuegos({ backgroundColor, text, descripcion }: CajaJuegosProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor }]}>
        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{text}</Text>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{descripcion}</Text>
        </View>

        {/* Botón */}
        <Link href={ROUTES.AHORCADO_INICIAL}>
          <View style={styles.actionContainer}>
            <Text style={styles.buttonText}>Jugar</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
  },
  container: {
    flex: 1,
    borderColor: colors.grisOscuro,
    borderWidth: 4,
    padding: 10,
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 14,
    color: "white",
    fontFamily: "PixelFont",
  },
  descriptionContainer: {
    flex: 2,
    justifyContent: "center",
  },
  description: {
    color: "white",
    fontSize: 10,
  },
  actionContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 10,
    fontFamily: "PixelFont",
    marginTop: 5,
  },
});

export { CajaJuegos };

