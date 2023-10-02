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
  // This will be used to resolve the <title> of the page
  title: '',
  meta: [],
  links: [],
};
