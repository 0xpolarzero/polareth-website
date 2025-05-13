import type { MetaFunction } from "@remix-run/node";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Home } from "~/lib/components/home";
import { FEATURED_REPOS, ORGANIZATION } from "~/lib/constants";
import { ThemeProvider } from "~/lib/providers/theme-provider";
import { ApiGithubResponse, Repository } from "~/lib/types";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const query = `
      query {
        organization(login: "${ORGANIZATION.name}") {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              description
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              pushedAt
            }
          }
        }
      }
    `;

    const apiResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ""}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await apiResponse.json();

    // Check for rate limit error in the response message
    if (data.message && data.message.includes("API rate limit exceeded")) {
      console.error("GitHub API rate limit exceeded:", data.message);
      return Response.json(
        {
          repositories: FEATURED_REPOS,
          error: "GitHub API rate limit exceeded",
        } as const satisfies ApiGithubResponse,
        { status: 500 },
      );
    }

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return Response.json(
        {
          repositories: FEATURED_REPOS,
          error: "GraphQL errors",
        } as const satisfies ApiGithubResponse,
        { status: 500 },
      );
    }

    // Map the GraphQL response to our Repository interface
    const results: Array<Required<Repository>> = data.data.organization.repositories.nodes
      .filter((repo: any) => FEATURED_REPOS.map((repo) => repo.name).includes(repo.name))
      .sort((a: any, b: any) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
      .map((repo: any) => {
        const baseRepo = FEATURED_REPOS.find((r) => r.name === repo.name);
        return {
          name: repo.name,
          description: repo.description,
          website: baseRepo?.website ?? "",
          type: baseRepo?.type ?? "app",
          stars: repo.stargazerCount,
          forks: repo.forkCount,
          language: repo.primaryLanguage?.name || null,
          topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
          lastPush: repo.pushedAt,
        };
      });

    return Response.json({
      repositories: results,
    } as const satisfies ApiGithubResponse);
  } catch (error: unknown) {
    console.error("Error fetching repositories:", error);
    return Response.json(
      {
        repositories: FEATURED_REPOS,
        error: error instanceof Error ? error.message : "Unknown error when fetching repositories",
      } as const satisfies ApiGithubResponse,
      { status: 500 },
    );
  }
}

export const meta: MetaFunction = () => {
  return [
    // Basic meta tags
    { title: ORGANIZATION.name },
    { name: "description", content: ORGANIZATION.description },
    { name: "author", content: ORGANIZATION.name },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "revisit-after", content: "7 days" },
    { name: "generator", content: "Remix" },

    // OpenGraph meta tags
    { property: "og:title", content: ORGANIZATION.name },
    { property: "og:description", content: ORGANIZATION.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://polareth.org" },
    { property: "og:image", content: "/og-image.png" },
    { property: "og:site_name", content: ORGANIZATION.name },

    // Twitter Card meta tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: ORGANIZATION.twitter },
    { name: "twitter:title", content: ORGANIZATION.name },
    { name: "twitter:description", content: ORGANIZATION.description },
    { name: "twitter:image", content: "/og-image.png" },

    // Additional meta tags
    { name: "theme-color", content: "#000000" },
    { name: "msapplication-TileColor", content: "#000000" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black" },
  ];
};

export default function Index() {
  return (
    <ThemeProvider>
      <Home data={useLoaderData<typeof loader>()} />
    </ThemeProvider>
  );
}
