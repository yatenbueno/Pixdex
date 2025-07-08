import { Initializer } from "@/src/components/Initializer";
import { AudiovisualesContextProvider } from "@/src/context/audiovisual-context";
import { RootLayout } from "@/src/layouts/RootLayout";
import { useState } from "react";

export default function () {
  const [appReady, setAppReady] = useState(false);
  return (
    <AudiovisualesContextProvider>
      {!appReady ? (
        <Initializer onFinish={() => setAppReady(true)} />
      ) : (
        <RootLayout />
      )}
    </AudiovisualesContextProvider>
  );
}
