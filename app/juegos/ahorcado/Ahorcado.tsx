import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import Boton from "@/src/components/Boton";
import { BotonBack } from "@/src/components/BotonBack";
import ModalLetra from "@/src/components/ModalAhorcadoLetra";
import ModalAhorcado from "@/src/components/ModalAhorcadoNombre";
import ModalGenerico from "@/src/components/ModalGenerico";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Ahorcado() {
  const [modalAdivinarNombreVisible, setModalAdivinarNombreVisible] =
    useState(false);
  const [modalLetraVisible, setModalLetraVisible] = useState(false);
  const [vidas, setVidas] = useState(5);
  const [puntos, setPuntos] = useState(0);
  const { contenidos } = useContext(AudiovisualesContext);
  const [contenidoActual, setContenidoActual] =
    useState<IContenidoAudiovisual | null>(null);
  const [contenidosDisponibles, setContenidosDisponibles] = useState<
    IContenidoAudiovisual[]
  >([]);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(
    new Set()
  );
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [nombreJugador, setNombreJugador] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (contenidos.length > 0 && contenidosDisponibles.length === 0) {
      setContenidosDisponibles([...contenidos]);
    }

    // Solo llama cuando aún no hay contenido cargado
    if (contenidosDisponibles.length > 0 && !contenidoActual) {
      cargarContenidoNuevo();
    }
  }, [contenidos, contenidosDisponibles]);

  useEffect(() => {
    const obtenerNombre = async () => {
      const nombre = await AsyncStorage.getItem("nombreJugador");
      if (nombre) {
        setNombreJugador(nombre);
      }
    };
    obtenerNombre();
  }, []);

  const cargarContenidoNuevo = () => {
    if (contenidosDisponibles.length === 0) {
      Alert.alert("Fin del juego", "¡Ya adivinaste todos los contenidos!");
      setJuegoTerminado(true);
      return;
    }

    const indice = Math.floor(Math.random() * contenidosDisponibles.length);
    const nuevoContenido = contenidosDisponibles[indice];

    setContenidoActual(nuevoContenido);
    setLetrasAdivinadas(new Set());

    const nuevosRestantes = [...contenidosDisponibles];
    nuevosRestantes.splice(indice, 1);
    setContenidosDisponibles(nuevosRestantes);
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
        cargarContenidoNuevo();
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
            Player: {nombreJugador ?? "Sin nombre"}
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
          <Text style={styles.palabra}>{renderPalabra()}</Text>
          <Text style={styles.palabra}>{contenidoActual?.nombre}</Text>
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
          letrasUsadas={[...letrasAdivinadas]} // conveierto Set a array
          onCancel={() => setModalLetraVisible(false)}
          onConfirm={(letra) => {
            adivinarLetra(letra);
            setModalLetraVisible(false);
          }}
        />
      </ModalGenerico>

      <ModalGenerico visible={juegoTerminado} onClose={() => {}}>
        <View style={{ alignItems: "center", gap: 15 }}>
          <Texto
            style={{ fontSize: 18, color: colors.blanco, textAlign: "center" }}
          >
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
    width: "90%",
    height: 300,
    marginBottom: 20,
    resizeMode: "cover",
  },
  palabra: {
    fontSize: 28,
    color: colors.blanco,
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 10,
    marginVertical: 20,
    letterSpacing: 2,
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
