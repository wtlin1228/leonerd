import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { Partytown } from './partytown';
import { ThemeScript } from './theme-script';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const { url } = useLocation();
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="view-transition" content="same-origin" />
      <meta name="color-scheme" content="dark light" />
      <link rel="apple-touch-icon" sizes="250x250" href="/icon-logo.webp" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:url" content={url.href} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LeoNerd" />
      <meta property="og:locale" content="en_US" />

      {head.meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}

      {head.links.map((l, i) => (
        <link key={i} {...l} />
      ))}

      {head.styles.map((s, i) => (
        <style key={i} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      {import.meta.env.PROD && <Partytown />}

      <ThemeScript />
    </>
  );
});
