import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

import styles from '../posts/posts.css?inline';

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

export const head: DocumentHead = {
  title: 'About Me | LeoNerd',
  // links: [
  //   {
  //     rel: 'preload',
  //     // @ts-expect-error fetchpriority is not supported by all browsers
  //     fetchpriority: 'high',
  //     as: 'image',
  //     type: 'image/webp',
  //     href: '/about/cover.webp',
  //   },
  // ],
  // meta: [
  //   {
  //     name: 'description',
  //     content:
  //       "Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge.",
  //   },
  //   {
  //     property: 'og:title',
  //     content: 'About Me | LeoNerd',
  //   },
  //   {
  //     property: 'og:description',
  //     content:
  //       "Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge.",
  //   },
  //   {
  //     property: 'og:image',
  //     content: import.meta.env.PUBLIC_BLOG_URL + '/about/cover.webp',
  //   },
  //   {
  //     property: 'og:image:alt',
  //     content: 'Image for about page',
  //   },
  //   {
  //     property: 'og:image:width',
  //     content: '1000',
  //   },
  //   {
  //     name: 'og:image:height',
  //     content: '600',
  //   },
  //   {
  //     name: 'twitter:card',
  //     content: 'summary_large_image',
  //   },
  //   {
  //     name: 'twitter:site',
  //     content: '@WeiTangLin1',
  //   },
  //   {
  //     name: 'twitter:title',
  //     content: 'About Me | LeoNerd',
  //   },
  //   {
  //     name: 'twitter:description',
  //     content:
  //       "Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge.",
  //   },
  //   {
  //     name: 'twitter:image',
  //     content: import.meta.env.PUBLIC_BLOG_URL + '/about/cover.webp',
  //   },
  //   {
  //     name: 'twitter:image:alt',
  //     content: 'Image for about page',
  //   },
  // ],
};
