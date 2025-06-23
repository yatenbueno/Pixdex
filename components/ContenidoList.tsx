import { ROUTES } from "@/src/navigation/routes";
import { Link, useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { ContenidoCard } from "./ContenidoCard";

type ContenidoListProps = {
  contenidos: {
    id: number;
    nombre: string;
    descripcion: string;
    generos: number[];
    tipoId: number;
    imageUrl: string;
  }[];
};

export function ContenidoList({contenidos} : ContenidoListProps) {
  const router = useRouter();

  return (
    <FlatList
      data={contenidos}
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
  contentContainer: {},
});
