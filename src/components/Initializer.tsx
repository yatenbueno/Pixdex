import colors from "@/src/common/constants/Colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { getContenidos, getGeneros, getTipos } from "@/src/services/servicios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

// Definimos la prop children explícitamente
type InitializerProps = {
  children: React.ReactNode;
};

export default function Initializer({ children }: InitializerProps) {
  // Aseguramos que el contexto no sea undefined
  const context = useContext(AudiovisualesContext);
  
  // valida que el contexto exista
  if (!context) {
     throw new Error("Initializer debe estar dentro de AudiovisualesContextProvider");
  }

  const { setContenidos, setGeneros, setTipos } = context;
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);

        // --- SIMULACIÓN DE RETRASO ---
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const [contenidosData, generosData, tiposData] = await Promise.all([
          getContenidos(),
          getGeneros(),
          getTipos(),
        ]);

        console.log("Datos cargados vía API correctamente");

        setContenidos(contenidosData);
        setGeneros(generosData);
        setTipos(tiposData);
        
      } catch (e: any) {
        console.error("Error cargando datos:", e);
        setError(e.message || "No se pudo conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.fondo }}>
        <ActivityIndicator size="large" color={colors.blanco} />
        <Text style={{ color: "white", marginTop: 10 }}>Cargando Pixdex...</Text>
      </View>
    );
  }

  if (error) {
     return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.fondo }}>
        <Text style={{ color: "red", textAlign: 'center', padding: 20 }}>{error}</Text>
      </View>
    );
  }

  return <>{children}</>;
}