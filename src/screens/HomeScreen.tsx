import colors from "@/src/common/constants/Colors";
import { CajaCategoriaFlatList } from "@/src/components/CajaCategoriaFlatList";
import { CajaIndicadoraAcciones } from "@/src/components/CajaIndicadoraAcciones";
import { CajaJuegos } from "@/src/components/CajaJuegos";
import { ContenidoList } from "@/src/components/ContenidoList";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AudiovisualesContext } from "../context/audiovisual-context";
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
  const mostrarTipos =
    tiposSeleccionados.length > 0
      ? tipos.filter((t) => tiposSeleccionados.includes(t.id))
      : tipos;

  return (
    <ScrollView style={[styles.screenContainer]}>
      <View style={styles.mainContent}>
        <View style={styles.headerRow}>
          <Text style={styles.logoText}> Pixdex </Text>
          <CajaIndicadoraAcciones
            text="FILTRAR"
            filtros={filtros}
            setFiltros={setFiltros}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setTiposSeleccionados={setTiposSeleccionados}
            setGenerosSeleccionados={setGenerosSeleccionados}
          />
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
    padding: 20,
    gap: 20,
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
