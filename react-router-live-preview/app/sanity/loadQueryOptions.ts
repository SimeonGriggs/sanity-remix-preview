// app/sanity/loadQueryOptions.ts

import type { loadQuery } from "@sanity/react-loader";

import { getSession } from "~/sessions";
import { projectId, studioUrl } from "./projectDetails";

export async function loadQueryOptions(
  headers: Headers
): Promise<{ preview: boolean; options: Parameters<typeof loadQuery>[2] }> {
  const previewSession = await getSession(headers.get("Cookie"));
  const preview = previewSession.get("projectId") === projectId;

  return {
    preview,
    options: {
      perspective: preview ? "previewDrafts" : "published",
      stega: preview ? { enabled: true, studioUrl } : undefined,
    },
  };
}
