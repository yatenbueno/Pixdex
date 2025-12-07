import colors from "@/src/common/constants/Colors";
import { BotonBack } from "@/src/components/BotonBack";
import Etiqueta from "@/src/components/Etiqueta";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "expo-image";

export default function ContenidoSlugRoute() {
  const { slug } = useLocalSearchParams();
  const { contenidos, generos, tipos } = useContext(AudiovisualesContext);
  // uso el contexto
  const contenido = contenidosAudiovisuales.find(
    (item) => item.nombre === slug
  );
  const generosNombres = contenido?.generos.map(
    (generoId) => generos.find((g) => g.id === generoId)?.nombre
  );

  const tipoNombre = tipos.find((t) => t.id === contenido?.tipoId)?.singular;

  return (
    <ScrollView>
      <View style={styles.container}>
        <BotonBack />
        <View style={styles.borde}>
          <View style={styles.imagePlaceholder}>
            {/* <Text style={{ color: "#000", textAlign: "center" }}>{slug}</Text> */}
            <ImageBackground
              source={{ uri: contenido?.imageUrl }}
              style={styles.image}
              imageStyle={styles.imageInner}
            />
          </View>

          <Text style={styles.slugTitle}>{contenido?.nombre}</Text>

          <View style={{ marginLeft: 20, marginBottom: 15 }}>
            {tipoNombre && <Etiqueta texto={tipoNombre} variant="detalle" />}
          </View>

          <Text style={styles.description}>{contenido?.descripcion}</Text>

          <Text style={styles.genresTitle}>Genres</Text>
          <View style={styles.genreList}>
            {generosNombres?.map((genero, index) => (
              <Etiqueta key={index} texto={genero ?? ""} variant="detalle" />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  borde: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    marginTop: 30,
    paddingBottom: 20,
  },
  image: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInner: {
    resizeMode: "cover",
  },
  imagePlaceholder: {
    height: 400,
    width: "90%",
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: "#BEBEBE",
    marginBottom: 20,
    justifyContent: "center",
  },
  slugTitle: {
    fontSize: 20,
    color: colors.purpura,
    fontFamily: "PixelFont",
    marginBottom: 10,
    lineHeight: 24,
    marginLeft: 20,
  },
  description: {
    color: colors.blanco,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  genresTitle: {
    color: colors.verde,
    fontSize: 14,
    fontFamily: "PixelFont",
    marginBottom: 10,
    marginLeft: 20,
  },
  genreList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginLeft: 20,
  },
});
