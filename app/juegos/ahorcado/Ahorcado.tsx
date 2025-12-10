import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import Boton from "@/src/components/Boton";
import { BotonBack } from "@/src/components/BotonBack";
import { ContenedorBorde } from "@/src/components/ContenedorBorde";
import ModalLetra from "@/src/components/ModalAhorcadoLetra";
import ModalAhorcado from "@/src/components/ModalAhorcadoNombre";
import ModalGenerico from "@/src/components/ModalGenerico";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { AuthContext } from "@/src/context/auth-context";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { supabase } from "@/src/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Ahorcado() {
  const { session } = useContext(AuthContext);
  const router = useRouter();

  // --- OBTENCIÓN DEL NOMBRE ---
  // Intentamos sacar el 'username' de la metadata (así se suele guardar al registrarse).
  // Si no existe, usamos la parte del email antes del @.
  const nombreUsuarioReal =
    session?.user?.user_metadata?.username ||
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "Jugador";

  // Estados del juego
  const [modalAdivinarNombreVisible, setModalAdivinarNombreVisible] =
    useState(false);
  const [modalLetraVisible, setModalLetraVisible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [esAcierto, setEsAcierto] = useState(true);
  const [vidas, setVidas] = useState(5);
  const [puntos, setPuntos] = useState(0);

  // Estados de contenido
  const [imagenCargando, setImagenCargando] = useState(true);
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

  // 1. Effect para guardar puntaje al terminar
  useEffect(() => {
    if (juegoTerminado) {
      guardarPuntaje();
    }
  }, [juegoTerminado]);

  // 2. Effect para cargar contenidos iniciales
  useEffect(() => {
    if (contenidos.length > 0 && contenidosDisponibles.length === 0) {
      setContenidosDisponibles([...contenidos]);
    }
    // Solo llama cuando aún no hay contenido cargado
    if (contenidosDisponibles.length > 0 && !contenidoActual) {
      cargarContenidoNuevo();
    }
  }, [contenidos, contenidosDisponibles]);

  // 3. Effect para colocar el cargando en cada cambio de imagen
  useEffect(() => {
    setImagenCargando(true);
  }, [contenidoActual]);

  const cargarContenidoNuevo = () => {
    if (contenidosDisponibles.length === 0) {
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
        setEsAcierto(true);
        setMensajeExito(
          `¡Correcto!\nLa película era: ${contenidoActual?.nombre}`
        );
        setModalExitoVisible(true);
      }
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      if (nuevasVidas === 0) {
        // Si son 0 vidas, el mensaje de fin del juego lo activa setJuegoTerminado(),
        setJuegoTerminado(true);
      } else {
        // Si aún quedan vidas, mostramos el mensaje de error
        setEsAcierto(false);
        setMensajeExito(
          `¡Error! Intenta otra vez\nTe quedan ${nuevasVidas} vidas`
        );
        setModalExitoVisible(true);
      }
    }
  };

  const adivinarNombre = (inputNombre: string) => {
    const nombreLimpio = inputNombre.trim().toLowerCase();
    const nombreActual = contenidoActual?.nombre.toLowerCase() || "";

    if (nombreActual === nombreLimpio) {
      // --- CASO ACIERTO ---
      setPuntos((prev) => prev + 1);

      setEsAcierto(true);
      setMensajeExito(`¡Excelente!\nAdivinaste: ${contenidoActual?.nombre}`);
      setModalExitoVisible(true);
    } else {
      // --- CASO ERROR ---
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);

      if (nuevasVidas === 0) {
        setJuegoTerminado(true);
      } else {
        setEsAcierto(false);
        setMensajeExito(
          `¡Incorrecto! "${inputNombre}" no es el título.\nTe quedan ${nuevasVidas} vidas`
        );
        setModalExitoVisible(true);
      }
    }
    // Cerramos el modal del input
    setModalAdivinarNombreVisible(false);
  };

  // --- FUNCIÓN DE GUARDADO ---
  const guardarPuntaje = async () => {
    // 1. Verificación estricta de sesión
    if (!session || !session.user) {
      console.log("No hay sesión. No se guarda puntaje.");
      return;
    }

    try {
      console.log(`Guardando: ${nombreUsuarioReal} (${puntos} pts)`);

      const { error } = await supabase.from("ahorcado_scores").insert({
        username: nombreUsuarioReal, // Usamos la variable directa calculada anteriormente
        score: puntos,
        user_id: session.user.id, // Obligatorio para la base de datos
      });

      if (error) {
        console.error("Error al guardar en Supabase:", error);
      } else {
        console.log("Puntaje guardado correctamente.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };

  const manejarSalida = async () => {
    // Solo guardamos si el usuario hizo algún punto
    if (puntos > 0) {
      // Esperamos a que se guarde antes de salir para asegurar que la petición llegue a Supabase
      await guardarPuntaje();
    }
    // Ahora sí, volvemos atrás
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Envolvemos el botón para controlar el evento nosotros */}
        <TouchableOpacity onPress={manejarSalida}>
          <View pointerEvents="none">
            <BotonBack texto="EXIT" />
          </View>
        </TouchableOpacity>
        <View style={styles.vidas}>
          {[...Array(vidas)].map((_, i) => (
            <Ionicons key={i} name="heart" size={20} color={colors.purpura} />
          ))}
        </View>
        <View>
          {/* Mostramos el nombre derivado directamente */}
          <Text style={{ fontSize: 12, color: colors.blanco }}>
            Player: {nombreUsuarioReal}
          </Text>
          <Text style={{ fontSize: 12, color: colors.blanco }}>
            Score: {puntos}
          </Text>
        </View>
      </View>
      <ContenedorBorde
        style={{
          flex: 1,
          marginTop: 10,
          justifyContent: "flex-start",
          height: 100,
        }}
      >
        <View style={styles.botones}>
          <TouchableOpacity onPress={() => setModalAdivinarNombreVisible(true)}>
            <Boton texto="ADIVINAR NOMBRE" styleTexto={{ fontSize: 8.5 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalLetraVisible(true)}>
            <Boton texto="ADIVINAR LETRA" styleTexto={{ fontSize: 8.5 }} />
          </TouchableOpacity>
        </View>
        {/* Contenedor de la imagen */}
        <View style={styles.imageContainer}>
          {imagenCargando && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator
                size="large"
                color={colors.blanco || "white"}
              />
            </View>
          )}

          <Image
            source={{ uri: contenidoActual?.imageUrl }}
            style={styles.imagen}
            resizeMode="cover"
            onLoadStart={() => setImagenCargando(true)}
            onLoadEnd={() => setImagenCargando(false)}
          />
        </View>
        <Text style={styles.palabra}>{renderPalabra()}</Text>

        {/* Opcional: muestra nombre del contenido para depurar o mostrar el nombre real abajo */}
        {/* <Text style={styles.palabra}>{contenidoActual?.nombre}</Text>         */}
      </ContenedorBorde>
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
          letrasUsadas={[...letrasAdivinadas]}
          onCancel={() => setModalLetraVisible(false)}
          onConfirm={(letra) => {
            adivinarLetra(letra);
            setModalLetraVisible(false);
          }}
        />
      </ModalGenerico>

      {/* Modal de fin del juego (éxito/fallo) */}
      <ModalGenerico visible={juegoTerminado} onClose={() => {}}>
        <View style={{ alignItems: "center", gap: 15 }}>
          <Texto
            style={{ fontSize: 12, color: colors.blanco, textAlign: "center" }}
          >
            {vidas > 0
              ? "¡Felicidades! Completaste todos los contenidos."
              : "¡Se acabaron tus vidas!"}
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

      {/* Modal de éxito al acertar una ronda */}
      <ModalGenerico
        visible={modalExitoVisible}
        onClose={() => {
          setModalExitoVisible(false);
          // Solo cargamos nuevo contenido si fue un acierto. Si fue error, solo cerramos.
          if (esAcierto) cargarContenidoNuevo();
        }}
      >
        <View style={{ alignItems: "center", gap: 20 }}>
          {/* Ícono dinámico: Check verde o Cruz roja */}
          <Ionicons
            name={
              esAcierto ? "checkmark-circle-outline" : "close-circle-outline"
            }
            size={60}
            color={esAcierto ? colors.verde || "green" : "red"}
          />

          <Texto
            style={{ fontSize: 15, color: colors.blanco, textAlign: "center" }}
          >
            {mensajeExito}
          </Texto>

          <TouchableOpacity
            onPress={() => {
              setModalExitoVisible(false);
              if (esAcierto) {
                cargarContenidoNuevo();
              }
            }}
          >
            {/* Texto botón dinámico */}
            <Boton texto={esAcierto ? "SIGUIENTE NIVEL" : "CONTINUAR"} />
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
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 400,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  palabra: {
    fontSize: 28,
    color: colors.blanco,
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 30,
    letterSpacing: 4,
    textAlign: "center",
  },
});
