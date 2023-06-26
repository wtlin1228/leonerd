import { join } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { partytownVite } from '@builder.io/partytown/utils';
import { qwikNxVite } from 'qwik-nx/plugins';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/packages/blog',
  plugins: [
    qwikNxVite(),
    qwikCity({
      mdxPlugins: {
        rehypeSyntaxHighlight: false,
        remarkGfm: true,
        rehypeAutolinkHeadings: true,
      },
      mdx: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'dark-plus',
              onVisitLine(node: any) {
                // Prevent lines from collapsing in `display: grid` mode, and
                // allow empty lines to be copy/pasted
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
              onVisitHighlightedLine(node: any) {
                // Each line node by default has `class="line"`.
                node.properties.className.push('line--highlighted');
              },
              onVisitHighlightedWord(node: any, id: string) {
                // Each word node has no className by default.
                node.properties.className = ['word'];
                if (id) {
                  const backgroundColor = {
                    a: 'rgb(196 42 94 / 59%)',
                    b: 'rgb(0 103 163 / 56%)',
                    c: 'rgb(100 50 255 / 35%)',
                  }[id];

                  const color = {
                    a: 'rgb(255 225 225 / 100%)',
                    b: 'rgb(175 255 255 / 100%)',
                    c: 'rgb(225 200 255 / 100%)',
                  }[id];
                  if (node.properties['data-rehype-pretty-code-wrapper']) {
                    node.children.forEach((childNode: any) => {
                      childNode.properties.style = ``;
                      childNode.properties.className = '';
                    });
                  }
                  node.properties.style = `background-color: ${backgroundColor}; color: ${color};`;
                }
              },
            },
          ],
        ],
      },
    }),
    qwikVite({
      client: {
        outDir: '../../dist/packages/blog/client',
      },
      ssr: {
        outDir: '../../dist/packages/blog/server',
      },
    }),
    partytownVite({
      dest: join(__dirname, '../../dist/packages/blog/client', '~partytown'),
    }),
    tsconfigPaths({ root: '../../' }),
  ],
  server: {
    fs: {
      // Allow serving files from the project root
      allow: ['../../'],
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
