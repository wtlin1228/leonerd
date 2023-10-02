import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import {
  HomePage,
  postMatterSchema,
  type PostMatter,
} from '../components/home-page/home-page';

import fs from 'fs/promises';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const POST_PATH_PREFIX = 'packages/blog/src/routes/posts';

export const usePostMattersLoader = routeLoader$(async () => {
  try {
    const subdirectories = await fs.readdir(POST_PATH_PREFIX, {
      withFileTypes: true,
    });

    const vFiles = await Promise.all(
      subdirectories
        .filter((directory) => directory.isDirectory())
        .map((directory) =>
          read(`${POST_PATH_PREFIX}/${directory.name}/index.mdx`).then(
            (vFile) => {
              matter(vFile, { strip: true });
              return vFile;
            },
          ),
        ),
    );

    const postMatters = vFiles.reduce<(PostMatter & { url: string })[]>(
      (acc, vFile) => {
        try {
          const postMatter = postMatterSchema.parse(vFile.data.matter);
          const url =
            'posts' +
            vFile.path.slice(POST_PATH_PREFIX.length).replace('/index.mdx', '');
          acc.push({ ...postMatter, url });
        } catch {
          console.error(`[IGNORE] invalid frontmatter: ${vFile.path}`);
        }

        return acc;
      },
      [],
    );

    return postMatters.sort((a, b) => {
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.log(error);
    console.error('Failed to process the frontmatter of posts');
    return [];
  }
});

export default component$(() => {
  const postMatters = usePostMattersLoader();

  return <HomePage postMatters={postMatters.value} />;
});

export const head: DocumentHead = {
  title: 'Welcome to LeoNerd',
  links: [
    {
      rel: 'preload',
      // @ts-expect-error fetchpriority is not supported by all browsers
      fetchpriority: 'high',
      as: 'image',
      type: 'image/webp',
      // remember to update the LCP image path when publishing a new post
      href: '/posts/enhancing-ux-and-dx-the-influence-of-i18n-workflow/cover.webp',
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        "Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge.",
    },
    {
      property: 'og:title',
      content: 'Welcome to LeoNerd',
    },
    {
      property: 'og:description',
      content:
        "Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge.",
    },
    {
      property: 'og:image',
      content: import.meta.env.PUBLIC_BLOG_URL + '/icon-logo.webp',
    },
    {
      property: 'og:image:alt',
      content: 'Image of LeoNerd',
    },
    {
      property: 'og:image:width',
      content: '250',
    },
    {
      name: 'og:image:height',
      content: '250',
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
      content: 'Welcome to LeoNerd',
    },
    {
      name: 'twitter:description',
      content:
        "Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge.",
    },
    {
      name: 'twitter:image',
      content: import.meta.env.PUBLIC_BLOG_URL + '/icon-logo.webp',
    },
    {
      name: 'twitter:image:alt',
      content: 'Image of LeoNerd',
    },
  ],
};
