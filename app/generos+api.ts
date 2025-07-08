import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";

export function GET() {
  return Response.json(generosContenidoAudiovisual);
}