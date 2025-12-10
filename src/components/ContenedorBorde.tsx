import colors from "@/src/common/constants/Colors";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ContenedorBordeProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noCentrar?: boolean;
}

export const ContenedorBorde = ({ children, style, noCentrar }: ContenedorBordeProps) => {
  return (
    <View style={[styles.bordeBase, { alignItems: noCentrar ? 'flex-start' : 'center' }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bordeBase: {
    width: "100%",
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    paddingBottom: 20,
  },
});