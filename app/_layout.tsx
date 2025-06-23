import colors from "@/constants/Colors";
import { FuenteProvider, Texto } from "@/constants/FuenteProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PixelFont: require("@/assets/fonts/PressStart2P-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <Texto style={{ color: "#fff", backgroundColor: colors.fondo }}>
        Cargando...
      </Texto>
    );
  }

  return (
    <FuenteProvider>
      <SafeAreaView style={{ flex:1, marginTop: StatusBar.currentHeight}}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.fondo,
            },
          }}
        />
      </SafeAreaView>
    </FuenteProvider>
  );
}
