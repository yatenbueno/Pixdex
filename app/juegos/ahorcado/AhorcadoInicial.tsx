import colors from "@/src/common/constants/Colors";
import Boton from "@/src/components/Boton";
import { BotonBack } from "@/src/components/BotonBack";
import ModalAhorcado from "@/src/components/ModalAhorcadoNombre";
import ModalGenerico from "@/src/components/ModalGenerico";
import { ROUTES } from "@/src/navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Ahorcado() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreJugador, setNombreJugador] = useState<string | null>(null);

  useEffect(() => {
    const cargarNombre = async () => {
      const nombre = await AsyncStorage.getItem("nombreJugador");
      if (nombre) {
        setNombreJugador(nombre);
      }
    };
    cargarNombre();
  }, []);

  const iniciarJuego = async (nombre: string) => {
    await AsyncStorage.setItem("nombreJugador", nombre);
    setModalVisible(false);
    router.push(ROUTES.AHORCADO);
  };

  return (
    <View style={styles.container}>
      <BotonBack />

      <View style={styles.borde}>
        <Text style={styles.slugTitle}>Juego del ahorcado</Text>
        <Text style={styles.description}>
          Adivina los títulos de shows de TV, películas y anime una letra a la
          vez. Tienes 5 vidas - ¿Podes obtener el puntaje máximo?
        </Text>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Boton texto="INICIAR JUEGO" />
        </TouchableOpacity>
      </View>

      <ModalGenerico
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <ModalAhorcado
          onStart={iniciarJuego}
          texto="Ingresa tu nombre"
          textoBoton="INICIAR JUEGO"
          placeHolder="Nombre del jugador"
        />
      </ModalGenerico>
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
});
