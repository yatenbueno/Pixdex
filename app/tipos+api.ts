import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

export function GET() {
  return Response.json(tiposContenidoAudiovisual);
}