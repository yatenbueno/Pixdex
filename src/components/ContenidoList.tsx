import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { ROUTES } from "@/src/navigation/routes";
import { Link } from "expo-router";
import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ContenidoCard } from "./ContenidoCard";
import { Texto } from "../common/constants/FuenteProvider";
import colors from "../common/constants/Colors";

type ContenidoListProps = {
  tipoId: number;
  generosFiltrados?: number[];
};

export function ContenidoList({
  tipoId,
  generosFiltrados,
}: ContenidoListProps) {
  const { contenidos, generos } = useContext(AudiovisualesContext);

  //Filtrado usando el contexto
  const filtrado = contenidos.filter((contenido) => {
    const coincideTipo = contenido.tipoId === tipoId;

    const coincideGenero =
      !generosFiltrados || generosFiltrados.length === 0
        ? true
        : contenido.generos.some((g: number) => generosFiltrados.includes(g));

    return coincideTipo && coincideGenero;
  });

  // Renderizado condicional si no hay resultados
  if (filtrado.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Texto style={styles.emptyText}>
          No se encontraron coincidencias para los filtros aplicados.
        </Texto>
      </View>
    );
  }

  return (
    <FlatList
      data={filtrado}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: ROUTES.DETAIL,
            params: { slug: item.nombre },
          }}
        >
          <ContenidoCard {...item} />
        </Link>
      )}
      keyExtractor={(item) => item.nombre}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
  },
  emptyContainer: {
    height: 100, // Altura mínima para que la caja no colapse
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  emptyText: {
    color: colors.blanco,
    fontSize: 10,
    textAlign: "center",
    maxWidth: "80%", // Para que no toque los bordes si es texto largo
  },
});
