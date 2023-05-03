import { component$ } from '@builder.io/qwik';
import { routeLoader$, z, type DocumentHead } from '@builder.io/qwik-city';

import fs from 'fs/promises';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const POST_PATH_PREFIX = 'packages/blog/src/routes/posts';

const postMatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  featured: z.string(),
});

type PostMatter = z.infer<typeof postMatterSchema>;

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
            (vFile) => matter(vFile, { strip: true })
          )
        )
    );

    const postMatters = vFiles.reduce<(PostMatter & { url: string })[]>(
      (acc, vFile) => {
        try {
          const postMatter = postMatterSchema.parse(vFile.data.matter);
          const url = vFile.path.slice(POST_PATH_PREFIX.length);
          acc.push({ ...postMatter, url });
        } catch {
          console.error(`[IGNORE] invalid frontmatter: ${vFile.path}`);
        }

        return acc;
      },
      []
    );

    return postMatters.sort((a, b) => {
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    });
  } catch {
    console.error('Failed to process the frontmatter of posts');
    return [];
  }
});

export default component$(() => {
  const postMatters = usePostMattersLoader();
  console.log(postMatters.value);
  return (
    <div>
      <div>
        {postMatters.value.map((matter) => (
          <code>
            <pre>{JSON.stringify(matter, null, 4)}</pre>
          </code>
        ))}
      </div>
    </div>
  );
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
