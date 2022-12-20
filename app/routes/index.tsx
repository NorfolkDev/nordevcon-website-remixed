import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { DiscordCard } from "~/components/DiscordCard";
import { Footer } from "~/components/Footer";
import { Hero } from "~/components/Hero";
import { Introduction } from "~/components/Introduction";
import { Layout } from "~/components/Layout";
import { Newsletter } from "~/components/Newsletter";
import { Schedule } from "~/components/Schedule";
import { Sponsors } from "~/components/Sponsors";
import { Tickets } from "~/components/Tickets";
import { Venue } from "~/components/Venue";
import { AirtableApi } from "~/lib/airtable.server";
import { PriceProvider } from "~/lib/price-provider.server";
import { deserializeSchedule } from "~/lib/schedule";
import { parseSchedule } from "~/lib/schedule.server";

export async function loader({ context }: LoaderArgs) {
  const airtable = new AirtableApi(context as any);

  const [schedule, sponsors] = await Promise.all([
    airtable.getSchedule(),
    airtable.getSponsors(),
  ]);

  return json({
    price: PriceProvider(),
    schedule: parseSchedule(schedule, []),
    sponsors,
  });
}

export default function Index() {
  const { price, schedule, sponsors } = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Hero />

      <Introduction />
      <Tickets
        price={
          price ? { ...price, expires_at: new Date(price.expires_at) } : null
        }
      />
      <Schedule schedule={deserializeSchedule(schedule)} />
      <Sponsors data={sponsors} />
      <Venue />
      <DiscordCard />
      <Newsletter />
      <Footer />
    </Layout>
  );
}
