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
        <a href="/">
          {/* TODO: Change to my LOGO */}
          <span class="sr-only">Leo Blog Homepage</span>
          <QwikLogo />
        </a>
      </div>
      <ul>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <a href="https://github.com/wtlin1228" target="_blank">
            <span>
              <GithubLogo width={22} height={22} />
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/wtlin1228/" target="_blank">
            <span>
              <LinkedinLogo width={22} height={22} />
            </span>
          </a>
        </li>
      </ul>
    </header>
  );
});
