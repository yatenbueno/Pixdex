import Boton from "@/components/Boton";
import { BotonBack } from "@/components/BotonBack";
import ModalAhorcado from "@/components/ModalAhorcado";
import ModalGenerico from "@/components/ModalGenerico";
import colors from "@/constants/Colors";
import { obtenerContenidoAleatorio } from "@/services/apiContenido";
import { ContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Ahorcado() {
  // const navigation = useNavigation();
  // const router = useRouter();
  const [modalAdivinarVisible, setModalAdivinarVisible] = useState(false);
  const [vidas, setVidas] = useState(5);
  const [puntos, setPuntos] = useState(0);
  const [contenidoActual, setContenidoActual] =
    useState<ContenidoAudiovisual | null>(null);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [inputLetra, setInputLetra] = useState("");
  // const [inputNombre, setInputNombre] = useState("");
  const [nombreJugador, setNombreJugador] = useState<string | null>(
    "Nombre del jugador"
  ); // Reemplazar con props/param

  useEffect(() => {
    if (!contenidoActual) {
      cargarContenidoNuevo();
    }
  }, [contenidoActual]);

  const cargarContenidoNuevo = async () => {
    try {
      const contenido = await obtenerContenidoAleatorio();
      setContenidoActual(contenido);
      setLetrasAdivinadas([]);
    } catch (error) {
      console.error("Error al cargar el contenido:", error);
      Alert.alert("Error", "No se pudo cargar el contenido. Intenta nuevamente.");
    }
  };

  const renderPalabra = () => {
    return contenidoActual?.nombre
      .split("")
      .map((letra) => {
        if (letra === " ") return " ";
        return letrasAdivinadas.includes(letra.toLowerCase()) ? letra : "_";
      })
      .join(" ");
  };

  const adivinarLetra = () => {
    const letra = inputLetra.toLowerCase();
    if (!letra || letra.length !== 1) return;

    const nombre = contenidoActual?.nombre.toLowerCase() ?? "";
    if (nombre.includes(letra)) {
      setLetrasAdivinadas((prev) => [...prev, letra]);
      const todasAdivinadas = nombre
        .split("")
        .every((l) => letrasAdivinadas.includes(l) || l === letra);

      if (todasAdivinadas) {
        setPuntos((prev) => prev + 1);
        cargarContenidoNuevo();
      }
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      if (nuevasVidas === 0) setJuegoTerminado(true);
    }
    setInputLetra("");
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
    setModalAdivinarVisible(false);
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
          <TouchableOpacity onPress={() => setModalAdivinarVisible(true)}>
            <Boton
              texto="ADIVINAR NOMBRE"
              styleTexto={{ fontSize: 8.5 }}
            ></Boton>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Boton
              texto="ADIVINAR LETRA"
              styleTexto={{ fontSize: 8.5 }}
            ></Boton>
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

          <TextInput
            placeholder="Letra"
            value={inputLetra}
            onChangeText={setInputLetra}
            style={styles.input}
            maxLength={1}
          />
        </View>
      </View>
      <ModalGenerico
        visible={modalAdivinarVisible}
        onClose={() => setModalAdivinarVisible(false)}
      >
        <ModalAhorcado
          onStart={adivinarNombre}
          texto="Adivina el título"
          textoBoton="ADIVINAR"
          placeHolder="Escribe el título completo"
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
  input: {
    backgroundColor: colors.blanco,
    padding: 8,
    width: "70%",
    borderRadius: 8,
    marginVertical: 5,
    fontSize: 16,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(66, 35, 35, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  titulo: {
    color: colors.blanco,
    fontSize: 24,
  },
});
