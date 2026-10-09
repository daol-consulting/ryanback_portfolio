import { PassThrough } from "node:stream";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App.jsx";

/** Build-time render used by scripts/prerender.mjs. Resolves once lazy sections are ready. */
export function render() {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new PassThrough();
    sink.on("data", (chunk) => {
      html += chunk.toString();
    });
    sink.on("end", () => resolve(html));
    sink.on("error", reject);

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      }
    );
  });
}
