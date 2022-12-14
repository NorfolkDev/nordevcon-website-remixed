import { Footer } from "../components/Footer";
import { Gallery } from "~/components/Gallery";
import { HeroSecondary } from "~/components/HeroSecondary";
import { CubeIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Layout } from "~/components/Layout";

const Images = [
  "/img/sponsor_gallery_1.jpg",
  "/img/sponsor_gallery_2.jpg",
  "/img/sponsor_gallery_3.jpg",
];

export default function Sponsorhip() {
  return (
    <Layout>
      <HeroSecondary title="Sponsorship" />

      <div className="px-4 py-12 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 ">
          The Norfolk Developers&apos; Conference is a non-profit event which
          relies on sponsorship to keep costs to delegates as low as possible.
        </h2>
        <p className="mb-2 text-2xl text-slate-900">
          There are a number of opportunities to contribute to the community and
          we&apos;d love to partner with organisations and help spread your
          message in return for your support.
        </p>

        <p className="text-xl text-slate-500">
          To ensure you get the best experience and are able to engage with the
          community as best as possible we&apos;ve designed our sponsorship
          benefits to encourage engagement and have a few tips on getting the
          best out of your sponsorship.
        </p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl">
        <Gallery images={Images} />
      </div>

      <MainPackages />
      <RoomPackages />
      <Form />

      <Footer />
    </Layout>
  );
}

function MainPackages() {
  return (
    <div className="relative py-24">
      <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gradient-to-br from-wave-purple via-wave-pink to-wave-orange bg-move" />
      <div className="relative px-4 mx-auto max-w-7xl ">
        <div className="bg-gray-900 rounded-lg ">
          <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-6 text-center">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Sponsorship Packages
              </h2>
              <p className="max-w-4xl mx-auto mt-3 text-xl text-gray-300 sm:mt-5 sm:text-2xl">
                Your chance to be involved in Norfolk Developers Conference
                2023.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-12">
              <div className="grid gap-4 lg:grid-cols-2 lg:col-span-8">
                <div className="flex overflow-hidden rounded-lg">
                  <Package
                    title="Elite"
                    price="5,000"
                    features={[
                      "Double sized exhibition space in the main auditorium",
                      "30 minute speaking slot, may be of a sales/marketing nature",
                      "Six conference tickets",
                      "Two pop-up banners on main stage",
                      "Logo on delegate lanyards",
                      "Logo on the nor.dev/con website",
                      "Logo on cover of the programme",
                      "Logo in opening presentation",
                      "Prominent full page advert in the programme",
                      "Article on the nor.dev website",
                      "Mentions on our social media",
                      "Discord privileges",
                    ]}
                  />
                </div>
                <div className="flex overflow-hidden rounded-lg">
                  <Package
                    title="Partner"
                    price="2,500"
                    features={[
                      "Exhibition space in the main auditorium",
                      "Four conference tickets",
                      "Logo on the nor.dev/con website",
                      "Logo in opening presentation",
                      "Full page advert in the programme",
                      "Article on the nor.dev website",
                      "Mentions on our social media",
                      "Discord privileges",
                    ]}
                  />
                </div>
              </div>
              <div className="flex overflow-hidden rounded-lg lg:col-span-4">
                <Package
                  title="Associate"
                  price="500"
                  features={[
                    "Logo on the nor.dev/con website",
                    "Logo in opening presentation",
                    "Logo in the programme",
                    "Mentions on our social media",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomPackages() {
  return (
    <div className="py-12">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="bg-gray-900 rounded-lg ">
          <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Food/Drink Sponsorship Packages
                </h2>
                <p className="max-w-4xl mx-auto mt-3 text-xl text-gray-300 sm:mt-5 sm:text-2xl">
                  Developers sure love a coffee, what better place for your
                  message, all packages includes a associate benefits.
                </p>
              </div>
              <div className="lg:col-span-4">
                <div className="flex overflow-hidden rounded-lg">
                  <Package
                    title="Refreshment Sponsorship"
                    price="1,400"
                    features={[
                      "2 x A4 banners on tea and coffee station",
                      "2 x A4 banners on lunch tables",
                      "Provide branded reusable cups",
                      "* Logo on the nor.dev/con website",
                      "* Logo in opening presentation",
                      "* Logo in the programme",
                      "* Mentions on our social media",
                    ]}
                  />
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="flex overflow-hidden rounded-lg ">
                  <Package
                    title="Conference Dinner"
                    price="3,300"
                    features={[
                      "Five minute introduction before dinner",
                      "Logo on placecards/card in lanyard",
                      "Space for two small banners at entrance",
                      "* Logo on the nor.dev/con website",
                      "* Logo in opening presentation",
                      "* Logo in the programme",
                      "* Mentions on our social media",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PackageProps {
  title: string;
  price: string;
  features: string[];
}

function Package({ title, price, features }: PackageProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-6 py-10 bg-white">
        <div>
          <h3
            className="text-2xl font-medium text-center text-slate-900"
            id="tier-scale"
          >
            {title}
          </h3>
          <div className="flex items-center justify-center mt-4">
            <span className="flex items-start px-3 text-6xl tracking-tight text-slate-900">
              <span className="mt-2 mr-2 text-4xl font-medium tracking-tight">
                £
              </span>
              <span className="font-bold">{price}</span>
            </span>
            <span className="text-xl font-medium text-slate-500">.00</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 p-6 border-t-2 border-slate-300 bg-slate-50 ">
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="flex-shrink-0">
                <CubeIcon
                  className="flex-shrink-0 w-6 h-6 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-3 text-base font-medium text-slate-700">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="py-12 bg-white rounded-lg">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Contact Us
              </h2>
              <p className="max-w-4xl mx-auto mt-3 text-xl text-slate-700 sm:mt-5 sm:text-2xl">
                Get in touch and let&apos;s talk about a conference sponsorship.
              </p>
            </div>
            <form
              method="GET"
              action="https://airtable.com/shrciza0EVMWpP5Th"
              className="flex flex-col p-4 overflow-hidden rounded-lg lg:p-8 lg:col-span-8 bg-slate-900"
            >
              <div className="mb-4 lg:mb-8">
                <label
                  htmlFor="contact-email"
                  className="block mb-2 font-bold text-gray-200 uppercase text-md"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="prefill_Email"
                  type="email"
                  className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4 lg:mb-8">
                <label
                  htmlFor="contact-package"
                  className="block mb-2 font-bold text-gray-200 uppercase text-md"
                >
                  Package
                </label>
                <select
                  id="contact-package"
                  name="prefill_Package"
                  className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600"
                >
                  <option value="Elite">Elite Sponsorship</option>
                  <option value="Partner">Partner Sponsorship</option>
                  <option value="Associate">Associate Sponsorship</option>
                  <option value="Refreshments">Refreshment Sponsorship</option>
                  <option value="Conference Dinner">Conference Dinner</option>
                </select>
              </div>

              <div className="lg:self-end">
                <button
                  type="submit"
                  className="flex w-full px-5 py-3 text-base font-bold text-white border border-transparent rounded-md shadow bg-wave-purple focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600 sm:px-10"
                >
                  Complete application
                  <PaperAirplaneIcon className="w-6 h-6 ml-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
