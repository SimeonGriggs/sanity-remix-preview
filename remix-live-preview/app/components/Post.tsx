// ./components/Post.tsx

import { PortableText } from "@portabletext/react";
import type { QueryParams, SanityDocument } from "@sanity/client";
import { useListeningQuery } from "@sanity/preview-kit";
import { builder } from "~/lib/sanity";

type PostProps = {
  post: SanityDocument;
  query?: string;
  params?: QueryParams;
};

export default function Post(props: PostProps) {
  const { query = ``, params = {} } = props;
  const post = useListeningQuery(props.post, query, params);

  if (!post) {
    return <div className="p-12 text-red-500">Post not found</div>;
  }

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {post.title ? <h1>{post.title}</h1> : null}
      {post.mainImage ? (
        <img
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder
            .image(post.mainImage)
            .width(300)
            .height(300)
            .quality(80)
            .url()}
          width={300}
          height={300}
          alt={post.title}
        />
      ) : null}
      {post.body ? <PortableText value={post.body} /> : null}
    </main>
  );
}
