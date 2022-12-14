import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Schedule } from "~/components/Schedule";
import { AirtableApi } from "~/lib/airtable.server";

export async function loader({ request, context }: LoaderArgs) {
  const airtable = new AirtableApi(context as any);
  const url = new URL(request.url);
  const filter = url.searchParams.get("share");
  return json({
    filter: filter?.split(",") ?? [],
    schedule: await airtable.getSchedule(),
  });
}

export default function SchedulePage() {
  const { filter, schedule } = useLoaderData<typeof loader>();

  return <Schedule filter={filter} data={schedule} isSharing />;
}
