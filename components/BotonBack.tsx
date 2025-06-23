import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Boton from "./Boton";

export const BotonBack = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); 
    }
  };
  return (
    <TouchableOpacity onPress={handleBack}>
      <View style={{ alignSelf: "flex-start" }}>
        <Boton texto="BACK" icono="arrow-back"></Boton>
      </View>
    </TouchableOpacity>
  );
};
