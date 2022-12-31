import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";
import isbot from "isbot";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // TODO: This is broken in Remix 1.10.0-pre.5. Find a different way to add these push headers.
  // const http2PushLinksHeaders = remixContext.matches
  //   .flatMap(({ route: { module, imports } }) => [module, ...(imports || [])])
  //   .filter(Boolean)
  //   .concat([
  //     remixContext.manifest.url,
  //     remixContext.manifest.entry.module,
  //     ...remixContext.manifest.entry.imports,
  //   ]);
  // responseHeaders.set(
  //   "Link",
  //   http2PushLinksHeaders
  //     .map(
  //       (link: string) =>
  //         `<${link}>; rel=preload; as=script; crossorigin=anonymous`
  //     )
  //     .concat(responseHeaders.get("Link") as string)
  //     .filter(Boolean)
  //     .join(",")
  // );

  const controller = new AbortController();
  let didError = false;
  const stream = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: controller.signal,
      onError(error: any) {
        didError = true;
        console.error(error);
      },
    }
  );

  if (isbot(request.headers.get("user-agent"))) {
    await stream.allReady;
  }

  return new Response(stream, {
    status: didError ? 500 : responseStatusCode,
    headers: responseHeaders,
  });
}
