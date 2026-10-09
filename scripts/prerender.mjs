/**
 * Post-build: render the app to HTML and place it inside #root in dist/index.html,
 * so crawlers and link previews get real content without running JavaScript.
 * The client hydrates this markup (see src/main.jsx).
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const ssrOut = path.join(root, ".tmp", "ssr");
const indexPath = path.join(root, "dist", "index.html");
const MARKER = "<!--app-html-->";

process.env.PRERENDER = "1";

await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-server.jsx", outDir: ssrOut, emptyOutDir: true },
});

const { render } = await import(pathToFileURL(path.join(ssrOut, "entry-server.js")).href);
const appHtml = await render();
const template = await readFile(indexPath, "utf8");
if (!template.includes(MARKER)) throw new Error(`[prerender] ${MARKER} not found in dist/index.html`);

await writeFile(indexPath, template.replace(MARKER, () => appHtml));
await rm(ssrOut, { recursive: true, force: true });
console.log(`[prerender] wrote ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
