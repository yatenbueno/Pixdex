// src/components/Etiqueta.tsx

import colors from "@/src/common/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

type EtiquetaProps = {
  texto: string;
  variant?: "card" | "detalle";
};

export default function Etiqueta({ texto, variant = "card" }: EtiquetaProps) {
  const styles = variant === "detalle" ? detalleStyles : cardStyles;

  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  tag: {
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
  text: {
    color: colors.blanco,
    fontSize: 8,
  },
});
const detalleStyles = StyleSheet.create({
  tag: {
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 4,
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.blanco,
    fontSize: 12,
  },
});
