import { z } from "zod";
const apiBase = "https://api.airtable.com/v0/appsFsySYgjKqDoLu";

export class AirtableApi {
  #apiKey;
  #waitUntil;
  constructor(context: EventContext<{ AIRTABLE_TOKEN: string }, any, any>) {
    this.#apiKey = context.env.AIRTABLE_TOKEN;
    this.#waitUntil = context.waitUntil;
  }

  async getSchedule(): Promise<ScheduleRecord[]> {
    const response = await this.#get("/Schedule");
    const json = await response.json();

    return scheduleResponseSchema.parse(json).records;
  }

  async getSponsors(): Promise<SponsorRecord[]> {
    const response = await this.#get("/Sponsors");
    const json = await response.json();

    return sponsorResponseSchema.parse(json).records;
  }

  async #get(endpoint: string) {
    const cache = await caches.open("airtable");
    const url = `${apiBase}${endpoint}`;
    let response = await cache.match(url);

    if (!response) {
      console.log("Cache miss", url);
      response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.#apiKey}`,
        },
      });
      response = new Response(response.body, response);
      response.headers.append("Cache-Control", "s-maxage=60");

      this.#waitUntil(cache.put(url, response.clone()));
    } else {
      console.log("Cache hit", url);
    }

    return response;
  }
}

type AnySchema = z.ZodSchema<any, any, any>;

const airtableResponseSchema = <TSchema extends AnySchema>(
  recordSchema: TSchema
): z.ZodSchema<{ records: z.infer<TSchema>[] }> =>
  z.object({
    records: z.array(recordSchema),
  });

const stringArraySchema = z.array(z.string().nullable());

const scheduleResponseSchema = airtableResponseSchema(
  z.object({
    id: z.string(),
    createdTime: z.string(),
    fields: z.object({
      Track: z.optional(z.string()),
      Description: z.optional(z.string()),
      Topics: z.optional(stringArraySchema).default([]),
      TopicNames: z.optional(stringArraySchema).default([]),
      Speakers: z.optional(stringArraySchema).default([]),
      SpeakerNames: z.optional(stringArraySchema).default([]),
      Live: z.optional(z.boolean()).default(false),
      Cancelled: z.optional(z.boolean()).default(false),
      id: z.number(),
      Start: z.string(),
      Title: z.optional(z.string()),
      Website: z.optional(stringArraySchema).default([]),
      LinkedIn: z.optional(stringArraySchema).default([]),
      Twitter: z.optional(stringArraySchema).default([]),
      AvatarUrl: z.optional(stringArraySchema).default([]),
    }),
  })
);

const sponsorResponseSchema = airtableResponseSchema(
  z.object({
    id: z.string(),
    createdTime: z.string(),
    fields: z.object({
      // TODO(TS): String union?
      Package: z.string(),
      Email: z.string(),
      Live: z.optional(z.boolean()).default(false),
      Invoiced: z.optional(z.boolean()).default(false),
      Description: z.string(),
      Name: z.string(),
      Logo: z.string(),
      Website: z.string(),
      Twitter: z.optional(z.string()),
      LinkedIn: z.optional(z.string()),
    }),
  })
);

export type ScheduleRecord = z.infer<
  typeof scheduleResponseSchema
>["records"][number];

export type SponsorRecord = z.infer<
  typeof sponsorResponseSchema
>["records"][number];
