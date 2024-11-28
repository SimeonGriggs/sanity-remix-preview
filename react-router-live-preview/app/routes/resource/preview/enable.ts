// app/routes/resource/preview/enable.ts

import { redirect } from "react-router";
import { validatePreviewUrl } from "@sanity/preview-url-secret";

import { client } from "~/sanity/client";
import { commitSession, getSession } from "~/sessions";
import { projectId } from "~/sanity/projectDetails";
import { Route } from "./+types/enable";

export const loader = async ({ request }: Route.LoaderArgs) => {
  if (!process.env.SANITY_READ_TOKEN) {
    throw new Response("Preview mode missing token", { status: 401 });
  }

  const clientWithToken = client.withConfig({
    token: process.env.SANITY_READ_TOKEN,
  });

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    throw new Response("Invalid secret", { status: 401 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  await session.set("projectId", projectId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
