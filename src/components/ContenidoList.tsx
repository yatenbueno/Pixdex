import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { ROUTES } from "@/src/navigation/routes";
import { Link } from "expo-router";
import { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ContenidoCard } from "./ContenidoCard";

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
});
