import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import Boton from "@/src/components/Boton";
import { BotonBack } from "@/src/components/BotonBack";
import { AuthContext } from "@/src/context/auth-context";
import { supabase } from "@/src/lib/supabase";
import { ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from "react-native";

// Tipo de dato para la tabla
type ScoreData = {
  id: number;
  username: string;
  score: number;
};

export default function Ahorcado() {
  const router = useRouter();
  const { session } = useContext(AuthContext);
  const [puntajes, setPuntajes] = useState<ScoreData[]>([]);
  const [cargando, setCargando] = useState(true);

  // Función para traer los datos
  const fetchScores = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("ranking_ahorcado_view") // Leemos la vista creada en Supabase
        .select("*")
        .order("score", { ascending: false }) // Ordenamos por score
        .limit(10); // solo trae los 10 primeros (mejores)

      if (error) {
        console.error("Error fetching ranking:", error);
      } else if (data) {
        setPuntajes(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    finally{
      setCargando(false);
    }
  };

  useEffect(() => {
    // 1. Carga inicial
    fetchScores();

    // 2. Suscripción a REALTIME
    // Nos suscribimos a cambios en la TABLA ORIGINAL ('ahorcado_scores') no a la VISTA
    const subscription = supabase
      .channel("ahorcado-scores-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ahorcado_scores" },
        (payload) => {
          console.log("Alguien jugó una partida nueva!", payload);
          // Cuando la tabla base cambia, recargamos la vista
          fetchScores();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const iniciarJuego = () => {
    router.push(ROUTES.AHORCADO);
  };

  const renderItem = ({ item, index }: { item: ScoreData; index: number }) => (
    <View style={styles.row}>
      <Texto style={styles.rank}>{index + 1}.</Texto>
      <Texto style={styles.username} numberOfLines={1}>
        {item.username}
      </Texto>
      <Texto style={styles.score}>{item.score.toString()}</Texto>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <BotonBack texto="BACK" />
      </View>

      <View style={styles.borde}>
        <Texto style={styles.title}>Juego del Ahorcado</Texto>

        <Text style={styles.description}>
          Adivina los títulos de shows de TV, películas y anime una letra a la
          vez. Tienes 5 vidas - ¿Puedes obtener el puntaje máximo?
        </Text>

        <View style={styles.buttonContainer}>
          <Pressable onPress={iniciarJuego}>
            <Boton
              texto="INICIAR JUEGO"
              styleContainer={{ paddingHorizontal: 30, paddingVertical: 10 }}
            />
          </Pressable>
        </View>

        <Texto style={styles.subtitle}>Top Players</Texto>

        <View style={styles.tableContainer}>
          {cargando ? (
                // CASO A: Cargando -> Spinner
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color={colors.verde} />
                </View>
            ) : puntajes.length === 0 ? (
                // CASO B: Terminó de cargar y NO hay datos -> Mensaje vacío
                 <View style={styles.centerContent}>
                    <Texto style={{color: '#888', fontSize: 10}}>Aún no hay puntuaciones.</Texto>
                    <Texto style={{color: '#888', fontSize: 10}}>¡Sé el primero!</Texto>
                 </View>
            ) : (
                // CASO C: Terminó de cargar y SÍ hay datos -> Lista
                <FlatList
                    data={puntajes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ padding: 10 }}
                />
            )}
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
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: colors.grisOscuro,
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: 18,
    color: colors.purpuraClaro,
    fontFamily: "PixelFont",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  description: {
    color: colors.blanco,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 30,
    position: "relative",
  },
  subtitle: {
    color: colors.verde,
    fontFamily: "PixelFont",
    fontSize: 14,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  tableContainer: {
    width: "100%",
    backgroundColor: "#2B2B2B",
    borderWidth: 2,
    borderColor: colors.grisOscuro,
    height: 300,
    borderRadius: 4,
  },
  centerContent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 4,
  },
  rank: {
    color: "white",
    width: 30,
    fontSize: 12,
  },
  username: {
    color: "white",
    flex: 1,
    fontSize: 12,
    textAlign: "left",
  },
  score: {
    color: colors.verde,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "PixelFont",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
