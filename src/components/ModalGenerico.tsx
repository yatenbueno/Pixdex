import colors from "@/src/common/constants/Colors";
import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type ModalGenericoProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalGenerico = ({ visible, onClose, children }: ModalGenericoProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fondo}>
          <TouchableWithoutFeedback>
            <View style={styles.contenedor}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedor: {
    width: "85%",
    backgroundColor: colors.fondo,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
});

export default ModalGenerico;
