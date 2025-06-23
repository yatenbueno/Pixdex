import { HomeScreen } from '@/src/screens/HomeScreen';

export default HomeScreen;


// import { StyleSheet,Text, View } from "react-native";
// import {useFonts} from "expo-font"
// import { ContenidoCard } from "@/src/screens/components/ContenidoCard";
// import { ContenidoList} from "@/src/screens/components/ContenidoList";
// import { CajaJuegos } from "@/src/screens/components/CajaJuegos";
// import { CajaCategoriaFlatList } from "@/src/screens/components/CajaCategoriaFlatList";
// import { CajaIndicadoraAcciones } from "@/src/screens/components/CajaIndicadoraAcciones";
// import colors from "@/src/constants/colors";
// import { Feather } from "@expo/vector-icons";

// export default function Index() {
//   const [fontsLoaded] = useFonts({
//     'PixelFont': require('../assets/fonts/PressStart2P-Regular.ttf'), 
//   });
  
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "flex-start",
//         alignItems: "center",
//         backgroundColor: colors.fondo,
//         paddingTop: 20,
//       }}
//     >
//       <View style={{ flexDirection: "row", marginBottom: 20 }}>
//         <Text
//           style={{
//             fontSize: 18,
//             color: colors.purpura,
//             fontWeight: "bold",
//             fontFamily: "PixelFont",
//           }}
//         >
//           {" "}
//           Pixdex{" "}
//         </Text>
//         {/* Falta modularizar para enviar el logo correspondiente */}
//         <CajaIndicadoraAcciones text="FILTRAR"></CajaIndicadoraAcciones>
//       </View>

//       <View style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
//         {/* Tarjeta 1 */}
//         <CajaJuegos
//           backgroundColor={colors.purpura}
//           text="Desafío del Ahorcado"
//           descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
//         ></CajaJuegos>

//         {/* Tarjeta 2 */}
//         <CajaJuegos
//           backgroundColor={colors.verde}
//           text="Pixel Reveal"
//           descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
//         ></CajaJuegos>
//       </View>

//       <CajaCategoriaFlatList text="SERIES">
//         <View style={styles.separator} />
//         <ContenidoList />
//       </CajaCategoriaFlatList>

//       {/* <CajaCategoriaFlatList text="PELICULAS">
//         <View style={styles.separator} />
//         <ContenidoList />
//       </CajaCategoriaFlatList>

//       <CajaCategoriaFlatList text="ANIME">
//         <View style={styles.separator} />
//         <ContenidoList />
//       </CajaCategoriaFlatList> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screenContainer: { flex: 1},
//   separator: { height: 20 },
// });