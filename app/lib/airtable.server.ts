const apiBase = "https://api.airtable.com/v0/appsFsySYgjKqDoLu";

export class AirtableApi {
  #apiKey;
  #waitUntil;
  constructor(context: EventContext<{ AIRTABLE_TOKEN: string }, any, any>) {
    this.#apiKey = context.env.AIRTABLE_TOKEN;
    this.#waitUntil = context.waitUntil;
  }

  getSchedule() {
    return this.#get("/Schedule");
  }

  getSponsors() {
    return this.#get("/Sponsors");
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
      response.headers.append("Cache-Control", "maxage=60");

      this.#waitUntil(cache.put(url, response.clone()));
    } else {
      console.log("Cache hit", url);
    }

    const json = (await response.json()) as any;

    return json.records;
  }
}
