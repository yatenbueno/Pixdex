import { Platform } from 'react-native';

// 1. Definimos un valor por defecto (para móvil o para cuando se está compilando en el servidor)
let origin = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081'; // Si no existe una ip en el .env entonces se intenta acceder a localhost

// 2. Solo sobrescribimos si es Web y si el objeto window realmente existe
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  origin = window.location.origin;
}

export const API_URL = origin;