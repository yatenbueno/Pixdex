import { CajaCategoriaFlatList } from "@/components/CajaCategoriaFlatList";
import { CajaIndicadoraAcciones } from "@/components/CajaIndicadoraAcciones";
import { CajaJuegos } from "@/components/CajaJuegos";
import { ContenidoList } from "@/components/ContenidoList";
import colors from "@/constants/Colors";
import { useFiltrarContenido } from "@/hooks/useFiltrarContenido";
import { contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FiltrosSeleccionados } from "../types/Filtros";

export function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosSeleccionados>({
    tiposSeleccionados: [],
    generosSeleccionados: [],
  });

  const filtrados = useFiltrarContenido(contenidosAudiovisuales, filtros);

  const series = filtrados.filter((c) => c.tipoId === 1);
  const peliculas = filtrados.filter((c) => c.tipoId === 2);
  const anime = filtrados.filter((c) => c.tipoId === 3);
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

      <CajaCategoriaFlatList text="SERIES">
        <ContenidoList contenidos={series} />
      </CajaCategoriaFlatList>
      <CajaCategoriaFlatList text="PELICULAS">
        <ContenidoList contenidos={peliculas} />
      </CajaCategoriaFlatList>
      <CajaCategoriaFlatList text="ANIME">
        <ContenidoList contenidos={anime} />
      </CajaCategoriaFlatList>
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
