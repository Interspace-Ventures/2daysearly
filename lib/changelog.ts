export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

// Newest entry first. The current app version is derived from CHANGELOG[0].
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "2026-06-06",
    changes: [
      "Added a version number and changelog to the footer.",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-06-06",
    changes: [
      "Added Instaswitch to the portfolio.",
      "Replaced Fizz with Mine to reflect the rebrand.",
      "Updated Waldo's description.",
      "Cleaned up the codebase and refreshed project documentation.",
    ],
  },
  {
    version: "1.1.0",
    date: "2025-08-19",
    changes: [
      "Migrated the site to Next.js 15 with the App Router.",
      "Introduced a fully responsive, fluid design framework.",
      "Adopted the green neobrutalism color palette.",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-08-17",
    changes: [
      "Initial launch with Hero, Purpose, Principles, Portfolio, and Partners sections.",
      "Added the embedded Tally application form.",
    ],
  },
];

export const APP_VERSION = CHANGELOG[0].version;
