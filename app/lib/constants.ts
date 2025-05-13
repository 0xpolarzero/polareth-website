import type { OrganizationInfo, Repository } from "~/lib/types";

// Configuration - you can modify these values
export const ORGANIZATION = {
  name: "polareth",
  description: "Open-source EVM tooling, infra and public goods.",
  twitter: "https://x.com/polarethorg",
} as const satisfies OrganizationInfo;

export const FEATURED_REPOS = [
  {
    name: "evmstate",
    description:
      "A TypeScript library for tracing, and visualizing EVM state changes with detailed human-readable labeling.",
    website: "https://evmstate.polareth.org",
    type: "documentation",
  },
  {
    name: "nightwatch",
    description: "A public archive of investigations into crypto scams and bad actors.",
    website: "https://nightwatch.polareth.org",
    type: "app",
  },
] as const satisfies Array<Repository>;
