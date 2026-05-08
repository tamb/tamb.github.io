import { HomeContent } from "@/components/HomeContent";
import {
  companyDemos,
  hostedGames,
  openSourceProjects,
  siteMeta,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <HomeContent
      siteMeta={siteMeta}
      companyDemos={companyDemos}
      games={hostedGames}
      openSourceProjects={openSourceProjects}
    />
  );
}
