// ./app/root.tsx

import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { lazy, Suspense } from "react";
import { getSession } from "~/sessions";

const PreviewProvider = lazy(() => import("~/components/PreviewProvider"));

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const preview = session.get("preview");

  return { preview };
};

export default function App() {
  const { preview } = useLoaderData();
  const children = <Outlet />

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.tailwindcss.com?plugins=typography" />
      </head>
      <body>
        {preview?.token ? (
          <PreviewProvider token={preview.token}>
            <Suspense fallback={children}>
              {children}
            </Suspense>
          </PreviewProvider>
        ) : (
          children
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}