import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Schedule } from "~/components/Schedule";
import { AirtableApi } from "~/lib/airtable.server";
import { parseSchedule } from "~/lib/schedule.server";

export async function loader({ request, context }: LoaderArgs) {
  const airtable = new AirtableApi(context as any);
  const url = new URL(request.url);
  const filter = url.searchParams.get("share")?.split(",") ?? [];
  return json({
    schedule: parseSchedule(await airtable.getSchedule(), filter),
  });
}

export default function SchedulePage() {
  const { schedule } = useLoaderData<typeof loader>();

  return <Schedule schedule={schedule} isSharing />;
}
