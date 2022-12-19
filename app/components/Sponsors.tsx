import { Link } from "@remix-run/react";
import { SocialIcon } from "react-social-icons";
import type { SponsorRecord } from "~/lib/airtable.server";
import { parseSponsors } from "~/lib/sponsors";

interface SponsorsProps {
  data: SponsorRecord[];
}

export function Sponsors({ data }: SponsorsProps) {
  const { elite, partner, associate } = parseSponsors(data);

  return (
    <div className="mt-12 bg-indigo-700 lg:mt-20">
      <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-indigo-100 lg:text-5xl">
          Sponsors
        </h2>
        <p className="mb-12 text-2xl text-center text-indigo-100">
          The Norfolk Developers Conference wouldn&apos;t be possible without
          the support of our wonderful sponsors. We&apos;re really grateful for
          their trust and support; and are proud to feature them below.
        </p>

        <div className="flex flex-col gap-12">
          <Elite organisation={elite[0]} />
          <Partner organisations={partner} />
          <Associate organisations={associate} />

          <div className="text-indigo-100">
            <p className="text-2xl text-center">
              Would you like to Sponsor East Anglia&apos;s biggest tech
              conference? Packages starting at £500. Get in touch and let&apos;s
              talk about a conference sponsorship.
            </p>

            <div className="flex items-center justify-center gap-6 mt-12">
              <a
                href="https://airtable.com/shrciza0EVMWpP5Th"
                className="px-8 py-4 text-xl font-bold text-indigo-100 border border-transparent rounded-md bg-violet-800 hover:bg-violet-700"
              >
                Apply to sponsor
              </a>
              <Link
                to="/sponsorship"
                className="px-8 py-4 text-xl font-bold text-indigo-100 border border-transparent rounded-md bg-violet-600 hover:bg-violet-500"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EliteProps {
  organisation: SponsorRecord["fields"] | undefined;
}

function Elite({ organisation }: EliteProps) {
  if (!organisation) return null;

  return (
    <div className="grid p-4 bg-indigo-400 rounded-md lg:grid-cols-2 lg:items-center lg:gap-6 lg:p-12">
      <div className="">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {organisation.Name}
        </h2>
        <SponsorDescription description={organisation.Description} />
        <div className="flex gap-4 mt-8">
          <div className="rounded-md shadow">
            <a
              href={organisation.Website}
              className="flex items-center justify-center px-5 py-3 text-base font-bold text-white bg-indigo-900 border border-transparent rounded-md hover:bg-indigo-800"
            >
              Visit their Site
            </a>
          </div>
          <Social organisation={organisation} />
        </div>
      </div>
      <div className="flex justify-center col-span-1 row-start-1 px-8 py-8 lg:row-start-auto">
        <img className="max-h-12" src={organisation.Logo} alt="Workcation" />
      </div>
    </div>
  );
}

interface SponsorProps {
  organisations: SponsorRecord["fields"][];
}

function Partner({ organisations }: SponsorProps) {
  if (!organisations.length) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {organisations.map(
        ({ Logo, Name, Description, ...organisation }, key) => (
          <div
            key={`associate_${key}`}
            className="flex flex-col items-center px-8 py-8 bg-indigo-100 rounded-md"
          >
            <img className="max-h-12" src={Logo} alt={Name} />

            <div className="mt-8">
              <h3 className="mb-2 text-3xl font-bold">{Name}</h3>
              <SponsorDescription description={Description} />
              <Social organisation={organisation} />
            </div>
          </div>
        )
      )}
    </div>
  );
}

function Associate({ organisations }: SponsorProps) {
  if (!organisations.length) return null;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {organisations.map((entry, key) => (
        <div
          key={`associate_${key}`}
          className="flex justify-center col-span-1 px-8 py-8 bg-indigo-100 rounded-md"
        >
          <img className="max-h-12" src={entry.Logo} alt={entry.Name} />
        </div>
      ))}
    </div>
  );
}

interface SocialProps {
  organisation: Pick<
    SponsorRecord["fields"],
    "Twitter" | "LinkedIn" | "Website"
  >;
}

function Social({ organisation }: SocialProps) {
  let { Twitter, LinkedIn, Website } = organisation;

  return (
    <ul className="flex gap-2">
      {Twitter && (
        <li>
          <SocialIcon url={Twitter} fgColor="white" />
        </li>
      )}

      {LinkedIn && (
        <li>
          <SocialIcon url={LinkedIn} fgColor="white" />
        </li>
      )}

      {Website && (
        <li>
          <SocialIcon url={Website} fgColor="white" />
        </li>
      )}
    </ul>
  );
}

interface SponsorDescriptionProps {
  description: string;
}

function SponsorDescription({ description }: SponsorDescriptionProps) {
  return (
    <>
      {description.split("\n\n").map((paragraph, key) => (
        <p key={`sponsor_description_${key}`} className="mb-4">
          {paragraph}
        </p>
      ))}
    </>
  );
}
