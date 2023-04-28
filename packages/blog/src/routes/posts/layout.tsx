import { component$, Slot, useStyles$ } from '@builder.io/qwik';

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
