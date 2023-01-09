import type { SponsorAirtableRecord } from "./airtable.server";

export interface SponsorsData {
  elite: SponsorAirtableRecord["fields"][];
  partner: SponsorAirtableRecord["fields"][];
  associate: SponsorAirtableRecord["fields"][];
}

export function parseSponsors(data: SponsorAirtableRecord[]): SponsorsData {
  let elite = getPackages(data, "Elite");
  let partner = getPackages(data, "Partner");
  let associate = getPackages(data, "Associate");

  return { elite, partner, associate };
}

/**
 * Maps fields prop to entries, and then filter by type
 */
function getPackages(
  data: SponsorAirtableRecord[],
  type: string
): SponsorAirtableRecord["fields"][] {
  return data
    .map((entity) => entity.fields)
    .filter((entity) => entity.Live)
    .filter((entity) => entity.Package === type);
}
