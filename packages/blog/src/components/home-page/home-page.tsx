import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { z } from '@builder.io/qwik-city';

export const postMatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  featured: z.string(),
});

export type PostMatter = z.infer<typeof postMatterSchema>;

import styles from './home-page.css?inline';

export const HomePage = component$(
  ({ postMatters }: { postMatters: (PostMatter & { url: string })[] }) => {
    useStylesScoped$(styles);

    return (
      <main>
        {postMatters.map((matter) => (
          <>
            <code>
              <pre>{JSON.stringify(matter, null, 4)}</pre>
            </code>
            <a href={matter.url}>{matter.title}</a>
          </>
        ))}
      </main>
    );
  }
);
