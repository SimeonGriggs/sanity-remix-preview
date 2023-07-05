// ./app/components/PostsPreview.tsx

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import Posts from "~/components/Posts";
import { postsQuery } from "~/lib/queries";

export default function PostsPreview({ posts }: { posts: SanityDocument[] }) {
  const [data] = useLiveQuery(posts, postsQuery);

  return <Posts posts={data} />;
}
