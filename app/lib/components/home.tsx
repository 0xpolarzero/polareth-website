import { RepositoryCard } from "~/lib/components/repository-card";
import { ThemeSwitcher } from "~/lib/components/theme-switcher";
import { IconLink } from "~/lib/components/ui/icon-link";
import { FEATURED_REPOS, ORGANIZATION } from "~/lib/constants";
import { ApiGithubResponse } from "~/lib/types";

import { Icons } from "./icons";

export const Home = ({ data: { repositories } }: { data: ApiGithubResponse }) => {
  return (
    <div className="flex h-screen flex-col items-center gap-4 px-8 py-4">
      <div className="bg-pattern" />
      <div className="text-foreground bg-muted/50 flex items-center gap-2 rounded-xs p-1 text-sm backdrop-blur-lg">
        <div className="flex items-center gap-1">
          <img src="/logo-light.png" alt="polareth" className="block size-6 dark:hidden" />
          <img src="/logo-dark.png" alt="polareth" className="hidden size-6 dark:block" />
          <h1 className="pb-[3px] font-semibold tracking-wide">polareth</h1>
        </div>
        <div className="bg-muted-foreground/20 mx-2 h-4 w-px" />
        <ThemeSwitcher />
        <div className="bg-muted-foreground/20 mx-2 h-4 w-px" />
        <IconLink href={`https://github.com/${ORGANIZATION.name}`} icon="Github" label="GitHub" type="button" />
        <IconLink href={ORGANIZATION.twitter} icon="Twitter" label="Twitter/X" type="button" />
      </div>
      {repositories.length === 0 &&
        FEATURED_REPOS.map((repository) => (
          <RepositoryCard key={repository.name} repository={repository} loading={true} />
        ))}
      {repositories.length > 0 &&
        repositories.map((repository) => (
          <RepositoryCard key={repository.name} repository={repository} loading={false} />
        ))}
    </div>
  );
};
