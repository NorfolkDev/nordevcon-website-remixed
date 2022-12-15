import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
