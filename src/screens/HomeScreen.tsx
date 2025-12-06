import colors from "@/src/common/constants/Colors";
import { CajaCategoriaFlatList } from "@/src/components/CajaCategoriaFlatList";
import { CajaIndicadoraAcciones } from "@/src/components/CajaIndicadoraAcciones";
import { CajaJuegos } from "@/src/components/CajaJuegos";
import { ContenidoList } from "@/src/components/ContenidoList";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Boton from "../components/Boton";
import { AudiovisualesContext } from "../context/audiovisual-context";
import { AuthContext } from "../context/auth-context";
import { ROUTES } from "../navigation/routes";
import { FiltrosSeleccionados } from "../types/Filtros";

export function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosSeleccionados>({
    tiposSeleccionados: [],
    generosSeleccionados: [],
  });
  const { tipos, generos } = useContext(AudiovisualesContext);
  const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([
    1, 2, 3,
  ]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>(
    []
  );
  const { session, signOut } = useContext(AuthContext);
  const router = useRouter();
  const mostrarTipos =
    tiposSeleccionados.length > 0
      ? tipos.filter((t) => tiposSeleccionados.includes(t.id))
      : tipos;

  return (
    <ScrollView style={[styles.screenContainer]}>
      <View style={styles.mainContent}>
        <View style={styles.headerRow}>
          <Text style={styles.logoText}> Pixdex </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* LÓGICA DEL BOTÓN DE SESIÓN */}
            {session ? (
              <TouchableOpacity onPress={signOut}>
                <Boton 
                  texto=" CERRAR SESIÓN" 
                  icono="log-out-outline" 
                  styleTexto={{ fontSize: 6.5 }}
                  styleContainer={{
                    paddingHorizontal: 4,
                    backgroundColor: colors.grisOscuro,
                    borderTopColor: colors.grisOscuro,
                    borderLeftColor: colors.grisOscuro,
                    borderRightColor: colors.gris,
                    borderBottomColor: colors.gris,
                  }}
                  iconSize={12}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => router.push(ROUTES.LOGIN)}>
                <Boton 
                  texto="INICIAR SESIÓN" 
                  icono="person" 
                  styleTexto={{ fontSize: 6.5 }}
                  styleContainer={{ paddingHorizontal: 4 }}
                  iconSize={12}
                />
              </TouchableOpacity>
            )}

            <CajaIndicadoraAcciones
              text="FILTRAR"
              filtros={filtros}
              iconSize={12}
              setFiltros={setFiltros}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setTiposSeleccionados={setTiposSeleccionados}
              setGenerosSeleccionados={setGenerosSeleccionados}
            />
          </View>
        </View>
      

        <View style={styles.gamesRow}>
          {/* Tarjeta 1 */}
          <View style={styles.gameBox}>
            <CajaJuegos
              backgroundColor={colors.purpura}
              text="Desafío del Ahorcado"
              descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
            ></CajaJuegos>
          </View>

          {/* Tarjeta 2 */}
          <View style={styles.gameBox}>
            <CajaJuegos
              backgroundColor={colors.verde}
              text="Pixel Reveal"
              descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
            ></CajaJuegos>
          </View>
        </View>
      </View>
      {mostrarTipos.map((tipo) => (
        <CajaCategoriaFlatList key={tipo.id} text={tipo.plural}>
          <ContenidoList
            tipoId={tipo.id}
            generosFiltrados={generosSeleccionados}
          />
        </CajaCategoriaFlatList>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  mainContent: {
    padding: 10,
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    color: colors.purpura,
    fontFamily: "PixelFont",
    fontWeight: "bold",
  },
  gamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  gameBox: {
    flex: 1,
  },
});
