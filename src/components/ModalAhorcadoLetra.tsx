import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Boton from "./Boton";

type Props = {
  onConfirm: (letra: string) => void;
  onCancel: () => void;
  letrasUsadas: string[];
};

const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ModalLetra = ({ onConfirm, onCancel, letrasUsadas }: Props) => {
  const [letraSeleccionada, setLetraSeleccionada] = useState<string | null>(
    null
  );

  return (
    <View style={styles.modal}>
      <Texto style={styles.titulo}>Adivina una letra</Texto>

      <View style={styles.grid}>
        {abecedario.map((letra) => {
          const usada = letrasUsadas.includes(letra.toLowerCase());
          const activa = letraSeleccionada === letra;

          return (
            <TouchableOpacity
              key={letra}
              disabled={usada}
              onPress={() => !usada && setLetraSeleccionada(letra)}
              style={{ opacity: usada ? 0.4 : 1 }}
            >
              <Boton
                texto={letra}
                styleContainer={{
                  backgroundColor: activa
                    ? colors.grisOscuro
                    : usada
                      ? colors.grisClaro
                      : colors.purpura,
                  borderTopColor:
                    activa || usada ? colors.grisOscuro : undefined,
                  borderLeftColor:
                    activa || usada ? colors.grisOscuro : undefined,
                  borderRightColor:
                    activa || usada ? colors.grisOscuro : undefined,
                  borderBottomColor:
                    activa || usada ? colors.grisOscuro : undefined,
                  borderWidth: activa ? 0 : undefined,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => letraSeleccionada && onConfirm(letraSeleccionada)}
          disabled={!letraSeleccionada}
          style={{ opacity: letraSeleccionada ? 1 : 0.5 }}
        >
          <Boton texto="ADIVINAR" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.fondo,
    // padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontFamily: "PixelFont",
    color: colors.blanco,
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
});

export default ModalLetra;
