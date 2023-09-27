import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

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
                  <div class="card-image">
                    <Link href={matter.url}>
                      <img
                        src={matter.featured}
                        alt={`cover for post - ${matter.title}`}
                        decoding="async"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        width={1000}
                        height={600}
                        style={`view-transition-name: img-${matter.title
                          .split(' ')
                          .join('-')}`}
                      ></img>
                    </Link>
                  </div>
                  <div class="card-content">
                    <h3 class="card-title">
                      <Link href={matter.url}>{matter.title}</Link>
                    </h3>
                    <p class="card-description">
                      <Link href={matter.url}>{matter.excerpt}</Link>
                    </p>
                    <div class="card-footer">
                      <div class="card-avatar">
                        <img
                          src="/github-avatar.webp"
                          alt="avatar"
                          height="250"
                          width="250"
                        />
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
  },
);
