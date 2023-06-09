// ./app/lib/sanity.ts

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// copy these from your Studio's sanity.config.ts
export const projectId = "z2iyc6ve";
export const dataset = "production";
export const apiVersion = "2023-01-01";

// use the right client depending on whether you're in preview mode or not
export const getClient = (preview = false) => preview ? previewClient : readClient;
export const readClient = createClient({ projectId, dataset, apiVersion, useCdn: true });
export const previewClient = createClient({ projectId, dataset, apiVersion, useCdn: false, token: process.env.SANITY_READ_TOKEN });

// helper function for generating image URLs
export const builder = imageUrlBuilder({ projectId, dataset });
