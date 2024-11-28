// app/sanity/projectDetails.ts

declare global {
  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string;
      SANITY_STUDIO_DATASET: string;
      SANITY_STUDIO_URL: string;
      SANITY_STUDIO_API_VERSION: string;
    };
  }
}

const {
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_URL,
  SANITY_STUDIO_API_VERSION,
} = typeof document === "undefined" ? process.env : window.ENV;

if (!SANITY_STUDIO_PROJECT_ID)
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID in .env");
if (!SANITY_STUDIO_DATASET)
  throw new Error("Missing SANITY_STUDIO_DATASET in .env");
if (!SANITY_STUDIO_URL) throw new Error("Missing SANITY_STUDIO_URL in .env");

export const projectId = SANITY_STUDIO_PROJECT_ID;
export const dataset = SANITY_STUDIO_DATASET;
export const studioUrl = SANITY_STUDIO_URL;
export const apiVersion = SANITY_STUDIO_API_VERSION || "2024-11-01";
