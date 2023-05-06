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
        <div class="home-container">
          {postMatters.map((matter, idx) => {
            let containerClass = 'post-container';
            if (idx === 0) {
              containerClass += ' post-container--large';
            }
            return (
              <div class={containerClass} key={matter.title}>
                <article class="card">
                  <a class="card-image" href={matter.url}>
                    <img
                      src={matter.featured}
                      alt={`cover for post - ${matter.title}`}
                    ></img>
                  </a>
                  <div class="card-content">
                    <h3 class="card-title">
                      <a href={matter.url}>{matter.title}</a>
                    </h3>
                    <p class="card-description">
                      <a href={matter.url}>{matter.excerpt}</a>
                    </p>
                    <div class="card-footer">
                      <div class="card-avatar">
                        <img src="/github-avatar.webp" alt="avatar"></img>
                      </div>
                      <div>
                        <p class="card-author">Leo Lin</p>
                        <p class="card-date">{matter.date}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </main>
    );
  }
);
