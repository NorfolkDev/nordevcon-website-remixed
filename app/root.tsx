import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import globalStyles from "./styles/globals.css";
import config from "~/config.json";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: config.title,
  viewport: "width=device-width,initial-scale=1",
  description: config.description,
  "theme-color": config.color,
  "og:title": config.title,
  "twitter:title": config.title,
  "og:description": config.description,
  "twitter:description": config.description,
  "og:type": "website",
  "twitter:card": "summary_large_image",
  "og:url": config.url,
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  if (caught.status == 404)
  {
      return (
      <html lang="en" className="min-h-screen bg-slate-900 text-center flex flex-col space-y-7">
      <head>
        <Meta />
        <Links />
      </head>
        <h1 className="font-bold text-5xl text-white"> {caught.status}: {caught.statusText} - We looked everywhere but this crab must have gotten to it first</h1>
      <body>
        <div className="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
          <img 
          src="/img/404.png"
          alt="Don't look him in the eye!"
          className="rounded-lg"
          />
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>

  );
}
}
