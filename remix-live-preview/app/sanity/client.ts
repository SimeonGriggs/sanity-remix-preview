import { createClient } from "@sanity/client";

import { projectId, dataset } from "~/sanity/projectDetails";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2023-03-20",
});
