import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { getContenidos, getGeneros, getTipos } from "@/src/services/servicios";
import { useContext, useEffect } from "react";
import { Text } from "react-native";

export function Initializer({ onFinish }: { onFinish: () => void }) {
  const { setContenidos, setGeneros, setTipos } =
    useContext(AudiovisualesContext);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [contenidos, generos, tipos] = await Promise.all([
          getContenidos(),
          getGeneros(),
          getTipos(),
        ]);
        setContenidos(contenidos);
        setGeneros(generos);
        setTipos(tipos);
      } catch (e) {
        console.error("Error al inicializar la app:", e);
      } finally {
        onFinish();
      }
    };

    fetchAll();
  }, []);

  return (
    <Text style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
      Cargando datos...
    </Text>
  );
}
