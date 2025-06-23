import colors from '@/constants/Colors';
import { Texto } from '@/constants/FuenteProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

type IconFamily = 'Ionicons' | 'FontAwesome' | 'MaterialIcons'; // Podés agregar más

type BotonProps = {
  texto: string;
  icono?: string; 
  iconSize?: number;
  iconColor?: string;
  styleContainer?: ViewStyle;
  styleTexto?: TextStyle;
};

const Boton = ({
  texto,
  icono,
  iconSize = 18,
  iconColor = 'white',
  styleContainer,
  styleTexto,
}: BotonProps) => {

  const iconProps = { name: icono as any, size: iconSize, color: iconColor };

  return (
    <View style={styles.botones}>
      <View style={[styles.boton, styleContainer]}>
        <View style={styles.contenido}>
          <Ionicons {...iconProps} style={styles.icono} />
          <Texto style={[styles.texto, styleTexto]}>{texto}</Texto>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  boton: {
    paddingRight: 12,
    paddingVertical: 5,
    backgroundColor: colors.purpura,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
    borderBottomColor: colors.purpuraOscuro,
  },
  contenido: {
    flexDirection: 'row',
  },
  icono: {
    marginRight: 6,
    paddingLeft: 6,
  },
  texto: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3,
    paddingRight: 6,
  },
});

export default Boton;
