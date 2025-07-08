import { contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";

export function GET() {
  return Response.json(contenidosAudiovisuales);
}