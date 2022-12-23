import type { SponsorRecord } from "./airtable.server";

export interface SponsorsData {
  elite: SponsorRecord["fields"][];
  partner: SponsorRecord["fields"][];
  associate: SponsorRecord["fields"][];
}

export function parseSponsors(data: SponsorRecord[]): SponsorsData {
  let elite = getPackages(data, "Elite");
  let partner = getPackages(data, "Partner");
  let associate = getPackages(data, "Associate");

  return { elite, partner, associate };
}

/**
 * Maps fields prop to entries, and then filter by type
 */
function getPackages(
  data: SponsorRecord[],
  type: string
): SponsorRecord["fields"][] {
  return data
    .map((entity) => entity.fields)
    .filter((entity) => entity.Live)
    .filter((entity) => entity.Package === type);
}
