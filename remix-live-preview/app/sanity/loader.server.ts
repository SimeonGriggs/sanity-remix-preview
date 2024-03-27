import { createQueryStore } from "@sanity/react-loader";

import { client } from "~/sanity/client";
import { studioUrl } from "~/sanity/projectDetails";

export const queryStore = createQueryStore({ client: false, ssr: true });

const clientWithToken = client.withConfig({
  token: process.env.SANITY_READ_TOKEN,
  stega: { enabled: true, studioUrl },
});

queryStore.setServerClient(clientWithToken);

export const { loadQuery } = queryStore;
