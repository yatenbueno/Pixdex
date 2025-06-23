import React from "react";
import { Text, TextProps } from "react-native";

const FuenteContexto = React.createContext("PixelFont");

export const FuenteProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FuenteContexto.Provider value="PixelFont">
      {children}
    </FuenteContexto.Provider>
  );
};

// Este componente reemplaza a <Text> y aplica la fuente por defecto
export const Texto = ({ style, ...props }: TextProps) => {
  return (
    <FuenteContexto.Consumer>
      {(fuente) => (
        <Text {...props} style={[{ fontFamily: fuente }, style]}>
          {props.children}
        </Text>
      )}
    </FuenteContexto.Consumer>
  );
};
