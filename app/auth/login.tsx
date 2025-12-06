import colors from "@/src/common/constants/Colors";
import { Texto } from "@/src/common/constants/FuenteProvider";
import Boton from "@/src/components/Boton";
import { BotonBack } from "@/src/components/BotonBack";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Switch entre Login y Registro
  const router = useRouter();

  async function handleAuth() {
    setLoading(true);
    try {
      if (isRegistering) {
        // REGISTRO
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert("Éxito", "Usuario creado correctamente. Ya puedes iniciar sesión.");
        setIsRegistering(false); // Cambiar a modo login
      } else {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace("/"); // Volver al home al loguearse
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <BotonBack />
      
      <View style={styles.formContainer}>
        <Texto style={styles.title}>
          {isRegistering ? "REGISTRARSE" : "INICIAR SESIÓN"}
        </Texto>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator color={colors.purpuraClaro} />
          ) : (
            <TouchableOpacity onPress={handleAuth}>
              <Boton texto={isRegistering ? "CREAR CUENTA" : "ENTRAR"} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          onPress={() => setIsRegistering(!isRegistering)}
          style={{ marginTop: 20 }}
        >
          <Texto style={styles.switchText}>
            {isRegistering
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate aquí"}
          </Texto>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fondo,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    color: colors.purpura,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: colors.negroOscuro,
    color: "white",
    borderWidth: 1,
    borderColor: colors.purpura,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 15,
    fontFamily: "SpaceMono-Regular",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  switchText: {
    color: colors.verde,
    fontSize: 9.5,
    textDecorationLine: "underline",
  },
});