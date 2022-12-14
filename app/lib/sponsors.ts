export function parseSponsors(data: any[]) {
  let elite = getPackages(data, "Elite");
  let partner = getPackages(data, "Partner");
  let associate = getPackages(data, "Associate");

  return [elite, partner, associate];
}

/**
 * Maps fields prop to entries, and then filter by type
 *
 * @param array data
 * @param string type
 * @return array
 */
export function getPackages(data: any, type: string) {
  return data
    .map((entity: any) => entity.fields)
    .filter((entity: any) => entity.Live)
    .filter((entity: any) => entity.Package === type);
}
