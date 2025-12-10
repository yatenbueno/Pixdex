import { Platform } from 'react-native';

// 1. Definimos un valor por defecto (para móvil o para cuando se está compilando en el servidor)
let origin = 'http://{ip}:8081'; 

// 2. Solo sobrescribimos si es Web Y si el objeto window realmente existe
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  origin = window.location.origin;
}

export const API_URL = origin;