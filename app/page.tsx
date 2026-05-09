import { HomeContent } from "@/components/HomeContent";
import { loadProjectSection } from "@/lib/portfolio/load";
import { companyDemos, hostedGames, siteMeta } from "@/lib/site-content";

export default function HomePage() {
  const openSourceProjects = loadProjectSection("open-source");

  return (
    <HomeContent
      siteMeta={siteMeta}
      companyDemos={companyDemos}
      games={hostedGames}
      openSourceProjects={openSourceProjects}
    />
  );
}
