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
        {/*Título*/}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{text}</Text>
        </View>

        {/*Descripción*/}
        <View style={styles.bodyRow}>
          <Text style={styles.description}>{descripcion}</Text>
        </View>

        {/*Botón*/}
        <View style={styles.footerRow}>
          <Link href={ROUTES.AHORCADO_INICIAL}>
            <Text style={styles.buttonText}>JUGAR</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    borderColor: colors.grisOscuro,
    borderWidth: 4,
    padding: 10,
    justifyContent: "space-between",
  },
  headerRow: {
    alignItems: "flex-start",
    // marginBottom: 1,
  },
  bodyRow: {
    flex: 1,
    justifyContent: "center",
  },
  footerRow: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  title: {
    fontSize: 12,
    color: "white",
    fontFamily: "PixelFont",
  },
  description: {
    color: "white",
    fontSize: 10,
    paddingBottom: 6
  },
  actionContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  buttonContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  buttonText: {
    color: "white",
    fontSize: 10,
    fontFamily: "PixelFont",
    marginTop: 5,
  },
});

export { CajaJuegos };

