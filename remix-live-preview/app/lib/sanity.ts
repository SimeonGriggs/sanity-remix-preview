// ./app/lib/sanity.ts

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// copy these from your Studio's sanity.config.ts
export const projectId = "z2iyc6ve";
export const dataset = "production";
export const apiVersion = "2023-06-01";

// only use a token to return drafts if preview mode is active
export const getClient = (preview = false) =>
  createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview, // API for preview mode, otherwise CDN
    token: preview ? process.env.SANITY_READ_TOKEN : undefined,
  });

// helper function for generating image URLs
export const builder = imageUrlBuilder({ projectId, dataset });
