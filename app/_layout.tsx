import Initializer from "@/src/components/Initializer";
import { AudiovisualesContextProvider } from "@/src/context/audiovisual-context";
import { AuthProvider } from "@/src/context/auth-context";
import { RootLayout } from "@/src/layouts/RootLayout";

export default function Layout() {
  return (
    <AuthProvider>
      <AudiovisualesContextProvider>
        <Initializer>
          <RootLayout />
        </Initializer>
      </AudiovisualesContextProvider>
    </AuthProvider>
  );
}
