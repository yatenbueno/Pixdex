import Boton from "@/components/Boton";
import { BotonBack } from "@/components/BotonBack";
import colors from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Ahorcado() {
  const navigation = useNavigation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreJugador, setNombreJugador] = useState<string | null>(null);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  // const iniciarJuego = () => {
  //   if (!nombreJugador) {
  //     setModalVisible(true);
  //   } else {
  //     // Aquí podrías agregar lógica para iniciar el juego
  //     console.log("Iniciando juego para:", nombreJugador);
  //   }
  // };

  return (
    <View style={styles.container}>
      <BotonBack/>
      <View style={styles.borde}>
        <View style={styles.botones}>
          <Boton texto="ADIVINAR TITULO" styleTexto={{ fontSize: 8.5}}></Boton>
          <Boton texto="ADIVINAR LETRA" styleTexto={{ fontSize: 8.5}}></Boton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fondo,
  },
  borde: {
    alignSelf: "center",
    height: 790,
    width: 390,
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    marginTop: 30,
  },
  slugTitle: {
    fontSize: 20,
    color: colors.purpura,
    fontFamily: "PixelFont",
    marginTop: 30,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: "center",
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
