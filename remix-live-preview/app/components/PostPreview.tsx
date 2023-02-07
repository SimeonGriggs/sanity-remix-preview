// ./app/components/PostPreview.tsx

import type { QueryParams } from "@sanity/client";
import { usePreview } from "~/lib/sanity";
import Post from "~/components/Post";
import ExitPreview from "~/components/ExitPreview";

export default function PostPreview({
  query,
  params,
}: {
  query: string;
  params: QueryParams;
}) {
  const post = usePreview(null, query, params);

  return (
    <>
      <Post post={post} />
      <ExitPreview />
    </>
  );
}