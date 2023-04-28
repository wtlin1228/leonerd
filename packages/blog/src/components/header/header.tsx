import {
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';

import { GlobalStore } from '../../context';
import {
  colorSchemeChangeListener,
  getColorPreference,
  setPreference,
  ThemeToggle,
} from '../theme-toggle/theme-toggle';

import { LeoNerdLogo } from '../icons/leonerd-logo';
import { GithubLogo } from '../icons/github-logo';
import { LinkedinLogo } from '../icons/linkedin-logo';

import styles from './header.css?inline';

export const Header = component$(() => {
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
          <span class="sr-only">LeoNerd Homepage</span>
          <LeoNerdLogo width={103} />
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
