// app/sanity/loader.server.ts

import * as queryStore from "@sanity/react-loader";

import { client } from "~/sanity/client";
import { studioUrl } from "./projectDetails";

const token = process.env.SANITY_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_READ_TOKEN in .env");
}

const clientWithToken = client.withConfig({
  token,
  stega: { studioUrl },
});

queryStore.setServerClient(clientWithToken);

export const { loadQuery } = queryStore;
