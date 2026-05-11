import desert from "@/assets/pkg-desert.jpg";
import kerala from "@/assets/pkg-kerala.jpg";
import spiti from "@/assets/pkg-spiti.jpg";
import rajasthan from "@/assets/dest-rajasthan.jpg";
import keralaDest from "@/assets/dest-kerala.jpg";
import goa from "@/assets/dest-goa.jpg";
import varanasi from "@/assets/dest-varanasi.jpg";
import himalayas from "@/assets/hero-himalayas.jpg";

const map: Record<string, string> = {
  "desert-nocturnes": desert,
  "hill-station-serenity": kerala,
  "spiritual-spiti": spiti,
  "backwater-bliss": keralaDest,
  "royal-rajasthan": rajasthan,
  "goa-slow-coast": goa,
};

export const fallbackImages = [desert, kerala, spiti, rajasthan, keralaDest, goa, varanasi, himalayas];

export function imageFor(slug: string, override?: string | null): string {
  if (override && /^https?:\/\//.test(override)) return override;
  return map[slug] ?? fallbackImages[0];
}