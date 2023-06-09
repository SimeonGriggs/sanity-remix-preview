// ./app/components/Posts.tsx

import { Link } from "@remix-run/react";
import type { QueryParams, SanityDocument } from "@sanity/client";
import { useListeningQuery } from "@sanity/preview-kit";

type PostProps = {
  posts: SanityDocument[];
  query?: string;
  params?: QueryParams
}

export default function Posts(props: PostProps) {
  const { query = ``, params = {} } = props;
  const posts = useListeningQuery(props.posts, query, params);

  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Link
            key={post._id}
            to={post.slug.current}
            className="p-4 hover:bg-blue-50"
          >
            <h2>{post.title}</h2>
          </Link>
        ))
      ) : (
        <div className="p-12 text-red-500">No posts found</div>
      )}
    </main>
  );
}