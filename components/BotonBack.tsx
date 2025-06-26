import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Boton from "./Boton";

type BotonBackProps = {
  texto?: string;
};

export const BotonBack = ({ texto = "BACK" }: BotonBackProps) => {
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (texto === "EXIT") {
      router.replace("/"); // Va a home y limpia el historial
    } else if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <TouchableOpacity onPress={handleBack}>
      <View style={{ alignSelf: "flex-start" }}>
        <Boton
          texto={texto}
          icono="arrow-back"
          styleContainer={{ paddingHorizontal: 0 }}
          styleIcon={{ marginRight: 6 }}
        ></Boton>
      </View>
    </TouchableOpacity>
  );
};
