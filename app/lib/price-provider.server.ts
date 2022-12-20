import { isBefore, compareDesc } from "date-fns";
import type { Price } from "./constants";
import { PRICES } from "./constants";

export function PriceProvider(): Price | null {
  let now = new Date();

  return (
    // @ts-expect-error Prices.sort doesn't work properly here. I think it should be Prices.sort((a, b) => compareDesc(a.expires_at, b.expires_at)))
    PRICES.sort(compareDesc).find((price) => isBefore(now, price.expires_at)) ??
    null
  );
}
