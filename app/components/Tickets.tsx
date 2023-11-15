import LightBulbIcon from "@heroicons/react/24/outline/LightBulbIcon";
import { format } from "date-fns";
import config from "~/config.json";
import type { Price } from "~/lib/constants";

interface TicketHeroProps {
  title: string;
  price: string;
  description: string;
}

const TicketHero = ({ title, price, description }: TicketHeroProps) => (
  <div className="flex-1 flex-grow bg-white px-6 py-8 sm:p-10 sm:pb-6">
    <div>
      <h3 className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-indigo-600">
        {title}
      </h3>
    </div>
    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
      {price}
      <span className="ml-1 text-2xl font-medium text-gray-500">.00</span>
    </div>
    {description && <p className="mt-5 text-lg text-gray-500">{description}</p>}
  </div>
);

interface TicketFeaturesProps {
  features: string[];
}

const TicketFeatures = ({ features }: TicketFeaturesProps) => (
  <ul className="space-y-4">
    {features.map((feature) => (
      <li key={feature} className="flex items-start">
        <div className="flex-shrink-0">
          <LightBulbIcon
            className="h-6 w-6 text-green-500"
            aria-hidden="true"
          />
        </div>
        <p className="ml-3 text-base text-gray-700">{feature}</p>
      </li>
    ))}
  </ul>
);

interface TicketsProps {
  price: Price | null;
}

export function Tickets({ price }: TicketsProps) {
  return (
    <div className="flex flex-col bg-gray-900">
      <div className="px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="text-center">
          <h2 className="text-lg font-semibold uppercase leading-6 tracking-wider text-gray-300">
            23rd &amp; 24th February 2023
          </h2>

          <div className="mx-auto max-w-4xl">
            {price ? (
              <>
                <p className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  Crab your ticket now!
                </p>
                <p className="mx-auto mt-4 max-w-4xl text-xl text-gray-300 sm:mt-5 sm:text-2xl">
                  {price.name} pricing available until{" "}
                  {/* TODO(Tom): Use Intl API */}
                  {format(price.expires_at, "do, MMMM u")}
                </p>
              </>
            ) : (
              <p className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Ticket sales are closed.
              </p>
            )}
          </div>
        </div>
      </div>

      {price && (
        <div className="m-auto grid max-w-7xl grid-cols-3 gap-4 px-4 py-12 sm:px-6 lg:px-0 lg:py-20">
          <div className="col-span-3 flex flex-col items-stretch overflow-hidden rounded-lg shadow-lg lg:col-span-2 lg:flex-row">
            <div className="flex flex-1 flex-grow flex-col border-b-2 border-gray-700 lg:border-r-2 lg:border-b-0">
              <TicketHero
                title="Thursday Ticket"
                price={price.tickets[0]}
                description="Our development day, 3 tracks with a focus on the technical, new frameworks, new languages and new features"
              />
              <div className="flex flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                <TicketFeatures
                  features={[
                    "Frontend Development",
                    "Backend Development",
                    "System engineering & DevOps",
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-grow flex-col border-t-2 border-gray-700 lg:border-l-2 lg:border-t-0">
              <TicketHero
                title="Friday Ticket"
                price={price.tickets[1]}
                description="Our mixed day, 3 tracks, one on development, another on business &amp; wellbeing, and our community spotlight track"
              />
              <div className="flex flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                <TicketFeatures
                  features={[
                    "Software Development",
                    "Game Development",
                    "Business",
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="col-span-3 flex overflow-hidden rounded-lg shadow-lg lg:col-span-1">
            <div className="flex flex-1 flex-col">
              <TicketHero
                title="Thursday &amp; Friday Ticket"
                price={price.tickets[2]}
                description="Access to both days, and the networking events surrounding the conference!"
              />
              <div className="flex flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                <TicketFeatures
                  features={[
                    "All the things",
                    "+ Networking events",
                    "+ Wine reception",
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <a
              href={config.tickets}
              className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-wave-pink px-5 py-3 text-lg font-extrabold text-white lg:text-2xl"
            >
              Crab your ticket now!
            </a>
          </div>
        </div>
      )}

      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/retrospective.jpg')" }}
      />
    </div>
  );
}
