import colors from "@/src/common/constants/Colors";
import { FuenteProvider, Texto } from "@/src/common/constants/FuenteProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar as StatusBarExpo } from "expo-status-bar";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";

export function RootLayout() {
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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.fondo,
        }}
      >
        <View
          style={{
            height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        />
        <StatusBarExpo style="light" translucent />
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
