// ./app/components/Posts.tsx

import { Link } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

export default function Posts({ posts }: { posts: SanityDocument[] }) {
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
        <div className="p-4 text-red-500">No posts found</div>
      )}
    </main>
  );
}