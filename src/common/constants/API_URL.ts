import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? "http://ip:8081" // Android fisico
    : "http://localhost:8081"; // Web
