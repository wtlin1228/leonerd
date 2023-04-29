import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';

import fs from 'fs/promises';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const POST_PATH_PREFIX = 'packages/blog/src/routes/posts';

export const usePostMatters = routeLoader$(async () => {
  const subdirectories = await fs.readdir(POST_PATH_PREFIX, {
    withFileTypes: true,
  });

  return await Promise.all(
    subdirectories
      .filter((directory) => directory.isDirectory())
      .map((directory) =>
        read(`${POST_PATH_PREFIX}/${directory.name}/index.mdx`)
      )
  ).then(
    (files) =>
      files
        .map((file) => {
          matter(file, { strip: true });
          return file.data;
        })
        .filter(({ matter }) => matter.title !== undefined)
    // TODO: sort by date
    // TODO: validate frontmatter with zod schema
  );
});

export default component$(() => {
  const postMatters = usePostMatters();
  console.log(postMatters.value);
  return <div></div>;
});

export const head: DocumentHead = {
  title: 'Welcome to Leonerd',
  meta: [
    {
      name: 'description',
      content:
        "Explore Leonerd's World, a captivating blog where technology, personal growth, and creativity converge.",
    },
  ],
};
