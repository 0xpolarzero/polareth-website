export interface Repository {
  name: string;
  description: string;
  website: string;
  type: "documentation" | "app";
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  lastPush?: string;
}

export interface OrganizationInfo {
  name: string;
  description: string;
  twitter: string;
}

export type ApiGithubResponse =
  | {
      repositories: Array<Required<Repository>>;
    }
  | {
      repositories: Array<Repository>;
      error: string;
    };
