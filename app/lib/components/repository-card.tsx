import { Icons } from "~/lib/components/icons";
import { Badge } from "~/lib/components/ui/badge";
import { Skeleton } from "~/lib/components/ui/skeleton";
import { ORGANIZATION } from "~/lib/constants";
import type { Repository } from "~/lib/types";
import { formatDate } from "~/lib/utils";

import { IconLink } from "./ui/icon-link";

export const RepositoryCard = ({ repository, loading }: { repository: Repository; loading: boolean }) => {
  return (
    <div className="block w-full max-w-[1200px]">
      <a href={repository.website} target="_blank" rel="noopener noreferrer">
        <div className="group border-border bg-muted/50 hover:bg-muted/80 hover:border-accent/50 relative flex h-full flex-col gap-3 overflow-hidden rounded-xs border p-6 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row">
            <h3 className="text-card-foreground text-xl font-semibold">{repository.name}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <IconLink
                href={repository.website}
                icon={repository.type === "documentation" ? "Documentation" : "Website"}
                label={repository.type === "documentation" ? "Documentation" : "Website"}
                className="website-link group-hover:bg-accent group-hover:text-accent-foreground group-has-[.github-link:hover]:bg-background group-has-[.github-link:hover]:text-foreground"
              />
              <IconLink
                href={`https://github.com/${ORGANIZATION.name}/${repository.name}`}
                icon="Github"
                label="GitHub"
                className="github-link"
              />
            </div>
          </div>

          <p className="text-primary/90 text-justify text-sm sm:text-base">{repository.description}</p>

          <div className="flex flex-wrap gap-2">
            {loading ? (
              <>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </>
            ) : (
              <>
                {repository.language && <Badge>{repository.language}</Badge>}
                {repository.topics?.map((topic) => (
                  <Badge key={topic} variant="secondary" className="bg-muted/50 text-muted-foreground">
                    {topic}
                  </Badge>
                ))}
              </>
            )}
          </div>

          <div className="text-muted-foreground mt-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {(loading || repository.stars !== undefined) && (
                <div className="flex items-center gap-1">
                  <Icons.Star />
                  {loading ? <Skeleton className="h-4 w-8" /> : <span>{repository.stars}</span>}
                </div>
              )}

              {(loading || repository.forks !== undefined) && (
                <div className="flex items-center gap-1">
                  <Icons.Fork />
                  {loading ? <Skeleton className="h-4 w-8" /> : <span>{repository.forks}</span>}
                </div>
              )}
            </div>

            {loading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              repository.lastPush && <div className="text-xs">Updated {formatDate(repository.lastPush)}</div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};
