import { component$ } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';

export const BlogPostCoverImage = component$(() => {
  const head = useDocumentHead();

  return (
    <img
      src={head.frontmatter.featured}
      width="1000"
      height="600"
      decoding="async"
      loading="eager"
      style={`view-transition-name: img-${head.title.split(' ').join('-')}`}
    />
  );
});
