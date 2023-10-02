import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

import styles from './posts.css?inline';

export default component$(() => {
  // Because we are using rehype with MDX, we need to use
  // the `useStyles$` hook to avoid the styles being
  // postfixed with some random string.
  useStyles$(styles);

  return (
    <div class="post">
      <main>
        <div class="post-container">
          <article>
            <Slot />
          </article>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = ({ head }) => ({
  title: head.title,
  links: [
    {
      rel: 'preload',
      fetchpriority: 'high',
      as: 'image',
      type: 'image/webp',
      href: head.frontmatter.featured,
    },
  ],
  meta: [
    {
      name: 'description',
      content: head.frontmatter.excerpt,
    },
    {
      property: 'og:title',
      content: `LeoNerd - ${head.title}`,
    },
    {
      property: 'og:description',
      content: head.frontmatter.excerpt,
    },
    {
      property: 'og:image',
      content: import.meta.env.PUBLIC_BLOG_URL + head.frontmatter.featured,
    },
    {
      property: 'og:image:alt',
      content: `Image of LeoNerd's Post - ${head.title}`,
    },
    {
      property: 'og:image:width',
      content: '1000',
    },
    {
      name: 'og:image:height',
      content: '600',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@WeiTangLin1',
    },
    {
      name: 'twitter:title',
      content: `LeoNerd - ${head.title}`,
    },
    {
      name: 'twitter:description',
      content: head.frontmatter.excerpt,
    },
    {
      name: 'twitter:image',
      content: import.meta.env.PUBLIC_BLOG_URL + head.frontmatter.featured,
    },
    {
      name: 'twitter:image:alt',
      content: `Image of LeoNerd's Post - ${head.title}`,
    },
  ],
});
