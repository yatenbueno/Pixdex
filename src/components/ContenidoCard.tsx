import colors from "@/src/common/constants/Colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { ImageBackground } from "expo-image";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Etiqueta from "./Etiqueta";

type TContenidoCardProps = {
  id: number;
  nombre: string;
  descripcion: string;
  generos: number[];
  tipoId: number;
  imageUrl: string;
};

export function ContenidoCard({
  nombre,
  generos,
  imageUrl,
}: TContenidoCardProps) {
  const context = useContext(AudiovisualesContext);
  if (!context) return null;
  const { generos: generosContext } = context;

  // Buscar nombres de géneros por ID
  const generosNombre = generos
    .map((id) => generosContext.find((g) => g.id === id)?.nombre)
    .filter(Boolean); // elimina undefined si algún ID no existe

  return (
    <View style={styles.card}>
      {/* Imagen */}
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageInner}
      />

      {/* Info abajo */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {nombre}
        </Text>
        <View style={styles.genreContainer}>
          {generosNombre.map((genero, index) => (
            <Etiqueta key={index} texto={genero ?? ""} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 280,
    borderWidth: 2,
    borderColor: colors.grisOscuro,
    backgroundColor: colors.negro,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInner: {
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  title: {
    fontSize: 8,
    color: "white",
    fontFamily: "PixelFont",
    marginBottom: 4,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  genreTag: {
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
  genreText: {
    color: "white",
    fontSize: 8,
  },
});
