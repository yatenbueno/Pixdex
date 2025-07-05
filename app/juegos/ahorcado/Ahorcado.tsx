import Boton from "@/components/Boton";
import { BotonBack } from "@/components/BotonBack";
import ModalLetra from "@/components/ModalAhorcadoLetra";
import ModalAhorcado from "@/components/ModalAhorcadoNombre";
import ModalGenerico from "@/components/ModalGenerico";
import colors from "@/constants/Colors";
import { obtenerContenidoAleatorio } from "@/services/apiContenido";
import { ContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Texto } from "@/constants/FuenteProvider";

export default function Ahorcado() {
  const [modalAdivinarNombreVisible, setModalAdivinarNombreVisible] =
    useState(false);
  const [modalLetraVisible, setModalLetraVisible] = useState(false);
  const [vidas, setVidas] = useState(5);
  const [puntos, setPuntos] = useState(0);
  const [contenidoActual, setContenidoActual] =
    useState<ContenidoAudiovisual | null>(null);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(
    new Set()
  );
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [nombreJugador, setNombreJugador] = useState<string | null>(
    "Nombre del jugador"
  );
  const router = useRouter();

  useEffect(() => {
    if (!contenidoActual) {
      cargarContenidoNuevo();
    }
  }, [contenidoActual]);

  const cargarContenidoNuevo = async () => {
    try {
      const contenido = await obtenerContenidoAleatorio();
      setContenidoActual(contenido);
      setLetrasAdivinadas(new Set()); // reiniciar letras SOLO al cargar nueva peli
    } catch (error) {
      console.error("Error al cargar el contenido:", error);
      Alert.alert(
        "Error",
        "No se pudo cargar el contenido. Intenta nuevamente."
      );
    }
  };

  const renderPalabra = () => {
    return contenidoActual?.nombre
      .split("")
      .map((letra) => {
        if (letra === " ") return " ";
        return letrasAdivinadas.has(letra.toLowerCase()) ? letra : "_";
      })
      .join(" ");
  };

  const adivinarLetra = (letra: string) => {
    if (vidas <= 0 || juegoTerminado) return;
    const letraLower = letra.toLowerCase();
    if (!letraLower || letraLower.length !== 1) return;

    const nombre = contenidoActual?.nombre.toLowerCase() ?? "";
    const nuevasLetras = new Set(letrasAdivinadas);
    nuevasLetras.add(letraLower);
    setLetrasAdivinadas(nuevasLetras);

    if (nombre.includes(letraLower)) {
      const todasAdivinadas = nombre
        .split("")
        .every((l) => l === " " || nuevasLetras.has(l));

      if (todasAdivinadas) {
        setPuntos((prev) => prev + 1);
        setContenidoActual(null);
      }
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      if (nuevasVidas === 0) setJuegoTerminado(true);
    }
  };

  const adivinarNombre = (inputNombre: string) => {
    if (contenidoActual?.nombre.toLowerCase() === inputNombre.toLowerCase()) {
      setPuntos((prev) => prev + 1);
      cargarContenidoNuevo();
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      if (nuevasVidas === 0) setJuegoTerminado(true);
    }
    setModalAdivinarNombreVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BotonBack texto="EXIT" />
        <View style={styles.vidas}>
          {[...Array(vidas)].map((_, i) => (
            <Ionicons key={i} name="heart" size={20} color={colors.purpura} />
          ))}
        </View>
        <View>
          <Text style={{ fontSize: 12, color: colors.blanco }}>
            Player: {nombreJugador}
          </Text>
          <Text style={{ fontSize: 12, color: colors.blanco }}>
            Score: {puntos}
          </Text>
        </View>
      </View>
      <View style={styles.borde}>
        <View style={styles.botones}>
          <TouchableOpacity onPress={() => setModalAdivinarNombreVisible(true)}>
            <Boton texto="ADIVINAR NOMBRE" styleTexto={{ fontSize: 8.5 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalLetraVisible(true)}>
            <Boton texto="ADIVINAR LETRA" styleTexto={{ fontSize: 8.5 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.centro}>
          {contenidoActual && (
            <Image
              source={{ uri: contenidoActual.imageUrl }}
              style={styles.imagen}
            />
          )}
          <Text style={styles.palabra}>
            {renderPalabra()} {contenidoActual?.nombre}
          </Text>
        </View>
      </View>
      <ModalGenerico
        visible={modalAdivinarNombreVisible}
        onClose={() => setModalAdivinarNombreVisible(false)}
      >
        <ModalAhorcado
          onStart={adivinarNombre}
          texto="Adivina el título"
          textoBoton="ADIVINAR"
          placeHolder="Escribe el título completo"
        />
      </ModalGenerico>

      <ModalGenerico
        visible={modalLetraVisible}
        onClose={() => setModalLetraVisible(false)}
      >
        <ModalLetra
          letrasUsadas={[...letrasAdivinadas]} // convertimos Set a array
          onCancel={() => setModalLetraVisible(false)}
          onConfirm={(letra) => {
            adivinarLetra(letra);
            setModalLetraVisible(false);
          }}
        />
      </ModalGenerico>

      <ModalGenerico
        visible={juegoTerminado}
        onClose={() => {}}
      >
        <View style={{ alignItems: "center", gap: 15 }}>
          <Texto style={{ fontSize: 18, color: colors.blanco, textAlign: "center" }}>
            ¡Se acabaron tus vidas!
          </Texto>

          <TouchableOpacity
            onPress={() => {
              setJuegoTerminado(false);
              setVidas(5);
              setPuntos(0);
              setContenidoActual(null);
              setLetrasAdivinadas(new Set());
              router.replace("/");
            }}
          >
            <Boton texto="VOLVER AL INICIO" />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vidas: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 15,
  },
  borde: {
    alignContent: "center",
    height: 790,
    width: 390,
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    marginTop: 30,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 11,
  },
  centro: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imagen: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: "cover",
    backgroundColor: "white",
  },
  palabra: {
    fontSize: 28,
    color: colors.blanco,
    backgroundColor: "grey",
    paddingHorizontal: 10,
    marginVertical: 20,
    letterSpacing: 4,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(66, 35, 35, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  nombre: {
    color: colors.blanco,
    fontSize: 24,
  },
});
