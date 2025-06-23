import colors from '@/constants/Colors';
import { Texto } from '@/constants/FuenteProvider';
import { ROUTES } from '@/src/navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Boton from './Boton';

type AhorcadoProps = {
  onStart: (nombre: string) => void;
};

const ModalAhorcado = ({ onStart }: AhorcadoProps) => {
  const [nombreJugador, setNombreJugador] = useState('');
  const router = useRouter();

  const handleStart = async () => {
    if (nombreJugador.trim() !== '') {
      const nombre = nombreJugador.trim();
      await AsyncStorage.setItem('nombreJugador', nombre); // Guardar
      onStart(nombre);
      router.push(ROUTES.AHORCADO); 
    }
  };

  return (
    <View style={styles.modal}>
      <Texto style={styles.titulo}>Ingresa tu nombre</Texto>

      <TextInput
        style={styles.input}
        placeholder="Nombre del jugador"
        placeholderTextColor="#aaa"
        value={nombreJugador}
        onChangeText={setNombreJugador}
      />
      <TouchableOpacity onPress={handleStart}>
        <Boton texto='INICIAR JUEGO'></Boton>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.fondo,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    fontFamily: "PixelFont",
    color: colors.blanco,
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#111",
    color: "white",
    borderWidth: 1,
    borderColor: colors.purpura,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    width: "100%",
    marginBottom: 20,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  boton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  aplicar: {
    backgroundColor: colors.purpura,
  },
  textoBoton: {
    color: "white",
    fontSize: 12,
    fontFamily: "PixelFont",
  },
});

export default ModalAhorcado;
