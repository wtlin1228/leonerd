import {
  component$,
  useContextProvider,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';

import { RouterHead } from './components/router-head/router-head';
import { GlobalStore, type SiteStore } from './context';

import globalStyles from './global.css?inline';

export default component$(() => {
  useStyles$(globalStyles);

  const store = useStore<SiteStore>({
    theme: 'auto',
  });
  useContextProvider(GlobalStore, store);

  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
