import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { ThemeScript } from './theme-script';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const { url } = useLocation();
  const head = useDocumentHead();

  const isPost = url.pathname.startsWith('/posts/');

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="dark light" />
      <link rel="apple-touch-icon" sizes="250x250" href="/icon-logo.webp" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:url" content={url.href} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LeoNerd" />
      <meta property="og:locale" content="en_US" />

      {isPost ? (
        <>
          <meta name="description" content={head.frontmatter.excerpt} />
          <meta property="og:title" content={`LeoNerd - ${head.title}`} />
          <meta property="og:description" content={head.frontmatter.excerpt} />
          <meta
            property="og:image"
            content={url.origin + head.frontmatter.featured}
          />
          <meta
            property="og:image:alt"
            content={`Image of LeoNerd's Post - ${head.title}`}
          />
          <meta property="og:image:width" content="1000" />
          <meta property="og:image:height" content="600" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@WeiTangLin1" />
          <meta name="twitter:title" content={`LeoNerd - ${head.title}`} />
          <meta name="twitter:description" content={head.frontmatter.excerpt} />
          <meta
            name="twitter:image"
            content={url.origin + head.frontmatter.featured}
          />
          <meta
            name="twitter:image:alt"
            content={`Image of LeoNerd's Post - ${head.title}`}
          />
        </>
      ) : (
        <>
          <meta property="og:title" content={head.title} />
          <meta
            property="og:description"
            content="Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge."
          />
          <meta property="og:image" content={url.origin + '/icon-logo.webp'} />
          <meta property="og:image:alt" content="Image of LeoNerd" />
          <meta property="og:image:width" content="250" />
          <meta property="og:image:height" content="250" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@WeiTangLin1" />
          <meta name="twitter:title" content={head.title} />
          <meta
            name="twitter:description"
            content="Explore LeoNerd's World, a captivating blog where technology, personal growth, and creativity converge."
          />
          <meta name="twitter:image" content={url.origin + '/icon-logo.webp'} />
          <meta name="twitter:image:alt" content="Image of LeoNerd" />
        </>
      )}

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      <ThemeScript />
    </>
  );
});
