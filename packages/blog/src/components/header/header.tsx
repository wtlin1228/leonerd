import {
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { GlobalStore } from '../../context';
import { QwikLogo } from '../icons/qwik';
import {
  colorSchemeChangeListener,
  getColorPreference,
  setPreference,
  ThemeToggle,
} from '../theme-toggle/theme-toggle';
import { GithubLogo } from '../icons/github-logo';

import styles from './header.css?inline';
import { LinkedinLogo } from '../icons/linkedin-logo';

export default component$(() => {
  useStylesScoped$(styles);

  const globalStore = useContext(GlobalStore);

  useVisibleTask$(({ cleanup }) => {
    globalStore.theme = getColorPreference();

    const removeListener = colorSchemeChangeListener((isDark) => {
      globalStore.theme = isDark ? 'dark' : 'light';
      setPreference(globalStore.theme);
    });

    cleanup(() => {
      removeListener();
    });
  });

  return (
    <header>
      <div class="logo">
        <a href="https://qwik.builder.io/" target="_blank">
          <QwikLogo />
        </a>
      </div>
      <ul>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <a
            href="https://qwik.builder.io/docs/components/overview/"
            target="_blank"
          >
            <span>
              <GithubLogo width={22} height={22} />
            </span>
          </a>
        </li>
        <li>
          <a
            href="https://qwik.builder.io/examples/introduction/hello-world/"
            target="_blank"
          >
            <span>
              <LinkedinLogo width={22} height={22} />
            </span>
          </a>
        </li>
        <li>
          <a
            href="https://qwik.builder.io/tutorial/welcome/overview/"
            target="_blank"
          >
            Tutorials
          </a>
        </li>
      </ul>
    </header>
  );
});
