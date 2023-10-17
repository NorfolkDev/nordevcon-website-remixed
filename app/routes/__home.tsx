import type { LinksFunction } from "@remix-run/server-runtime";
import { Layout } from "~/components/Layout";
import Logo from "~/components/svg/Logo";
import Waves from "~/components/svg/Waves";

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Comic+Neue&family=Red+Hat+Mono:wght@300&display=swap",
  },
];

export default function Index() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col justify-between bg-slate-900">
        <div className="flex flex-col gap-8 p-4 py-16 md:mb-16 md:p-16 md:pt-32">
          <div className="max-w-sm text-white md:max-w-lg">
            <Logo />
          </div>

          <div>
            <p className="font-display bg-move inline bg-gradient-to-r from-wave-purple via-wave-pink to-wave-orange bg-clip-text text-5xl font-extrabold leading-normal tracking-tight text-transparent">
              East Anglia&apos;s biggest tech conference
            </p>
          </div>

          <div>
            <p className="text-4xl tracking-tight text-white">
              22nd &amp; 23rd February 2024
            </p>
          </div>

          <ol className="flex flex-col gap-4 md:flex-row">
            <li>
              <a
                className="block rounded-md border border-transparent bg-violet-600 px-8 py-4 text-xl font-bold text-indigo-100 hover:bg-violet-500"
                href="https://airtable.com/shr80UEwZwDxM5GWF"
              >
                Apply to Sponsor
              </a>
            </li>
            <li>
              <a
                className="block rounded-md border border-transparent bg-violet-600 px-8 py-4 text-xl font-bold text-indigo-100 hover:bg-violet-500"
                href="https://airtable.com/shrNqdFASI9AItNhG"
              >
                Apply to Volunteer
              </a>
            </li>
            <li>
              <a
                className="block rounded-md border border-transparent bg-violet-600 px-8 py-4 text-xl font-bold text-indigo-100 hover:bg-violet-500"
                href="https://nor.dev/cfp"
              >
                Apply to Talk
              </a>
            </li>
          </ol>
          <h2 className="font-comic-sans text-5xl font-extrabold leading-normal tracking-tight text-cyan-50 text-transparent underline">
            <a href="https://ti.to/norfolkdevelopers/nordevcon-24">
              Buy tickets
            </a>
          </h2>
        </div>
        <Waves />
      </div>
    </Layout>
  );
}
