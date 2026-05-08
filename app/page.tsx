import { HomeContent } from "@/components/HomeContent";
import {
  companyDemos,
  hostedGames,
  siteMeta,
  tocadaUrl,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <HomeContent
      siteMeta={siteMeta}
      companyDemos={companyDemos}
      games={hostedGames}
      tocadaUrl={tocadaUrl}
    />
  );
}
