// ./app/routes/resource.preview.tsx

import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getSession, commitSession, destroySession } from "~/sessions";

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

// A `GET` request to this route will enter preview mode
export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  // See note on your responsibility to secure this token
  session.set(`preview`, process.env.SANITY_API_READ_TOKEN);

  return redirect(`/`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
