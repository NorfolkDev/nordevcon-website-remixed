import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Link,
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
import WildWaves from "./components/svg/WideWaves";
import type { ReactNode } from "react";

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
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let statusText =
    caught.status === 404
      ? "Not Found - We looked everywhere but this crab must have gotten to it first"
      : caught.statusText;

  return (
    <Document className="bg-slate-900">
      <div className="-mt-4 md:-mt-8 lg:-mt-12">
        <WildWaves />
      </div>
      <main className="mx-auto flex max-w-7xl flex-col justify-center gap-8 p-8 lg:gap-16 lg:p-16">
        <h1 className="text-center text-3xl font-bold leading-relaxed text-white lg:text-5xl">
          <span className="text-wave-orange">{caught.status}:</span>{" "}
          {statusText}
        </h1>

        <div className="relative mx-auto max-w-5xl">
          {caught.status === 404 ? (
            <>
              <Link to="/">
                <img
                  src="/img/404.jpg"
                  alt="Click here to go home"
                  className="rounded-lg"
                />
              </Link>
              <Link to="/" className="flex justify-center text-white underline">
                Go back home
              </Link>
            </>
          ) : (
            <img
              src="/img/error.jpg"
              alt="Don't look him in the eye"
              className="rounded-lg"
            />
          )}
        </div>
      </main>
    </Document>
  );
}

interface DocumentProps {
  children: ReactNode;
  className?: string;
}

function Document({ children, className }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={className}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
