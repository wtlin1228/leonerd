import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { LeoNerdLogo } from '../icons/leonerd-logo';
import { GithubLogo } from '../icons/github-logo';
import { LinkedinLogo } from '../icons/linkedin-logo';

import styles from './footer.css?inline';

export const Footer = component$(() => {
  useStylesScoped$(styles);

  return (
    <footer class="container">
      <div class="logo-bar">
        <LeoNerdLogo width={130} />
        <ul>
          <li>
            <a href="https://github.com/wtlin1228" target="_blank">
              <span>
                <GithubLogo width={28} height={28} />
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/wtlin1228/" target="_blank">
              <span>
                <LinkedinLogo width={28} height={28} />
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="divider" />
      <div class="copyright">
        <p>© 2023 Leonerd.</p>
      </div>
    </footer>
  );
});
