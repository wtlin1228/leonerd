import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './row.css?inline';

export const Row = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="row">
      <Slot />
    </div>
  );
});
