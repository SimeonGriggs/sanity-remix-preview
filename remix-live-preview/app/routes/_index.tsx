// ./app/routes/index.tsx

import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { GroqStoreProvider } from "@sanity/preview-kit/groq-store";

import ExitPreview from "~/components/ExitPreview";
import Posts from "~/components/Posts";
import { getClient, dataset, projectId } from "~/lib/sanity";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const query = `*[_type == "post" && defined(slug.current)]`;
  const session = await getSession(request.headers.get("Cookie"));
  const preview = session.get("preview");
  const posts: SanityDocument[] = await getClient(preview).fetch(query);

  return { posts, preview, query: preview ? query : null };
};

export default function PostRoute() {
  const { preview, query, posts } = useLoaderData();
  const children = <Posts posts={posts} query={query} />;

  return preview ? (
    <GroqStoreProvider projectId={projectId} dataset={dataset}>
      <>
        {children}
        <ExitPreview />
      </>
    </GroqStoreProvider>
  ) : (
    children
  );
}
