// app/components/Post.tsx

import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";

import { projectId, dataset } from "~/sanity/projectDetails";
const urlFor = imageUrlBuilder({ projectId, dataset });

export default function Post({ post }: { post: SanityDocument }) {
  const { title, mainImage, body } = post;

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage ? (
        <img
          className="float-right m-0 w-1/3 ml-8 mt-2 rounded-lg"
          src={urlFor.image(mainImage).width(300).height(300).quality(80).url()}
          width={300}
          height={300}
          alt={title}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  );
}
