// ./app/components/PostsPreview.tsx

import { usePreview } from "~/lib/sanity";
import Posts from "~/components/Posts";
import ExitPreview from "~/components/ExitPreview";

export default function PostsPreview({ query }: { query: string }) {
  const posts = usePreview(null, query);

  return (
    <>
      <Posts posts={posts} />
      <ExitPreview />
    </>
  );
}