import { isBefore, compareDesc } from "date-fns";

const Prices = [
  {
    name: "Super Early Bird",
    expires_at: new Date(2022, 10, 22),
    tickets: ["£36", "£63", "£90"],
  },
  {
    name: "Early Bird",
    expires_at: new Date(2023, 0, 22),
    tickets: ["£72", "£126", "£180"],
  },
  {
    name: "Standard",
    expires_at: new Date(2023, 1, 22),
    tickets: ["£90", "£180", "£300"],
  },
];

export type Price = typeof Prices[number];

export function PriceProvider(): Price | null {
  let now = new Date();

  return (
    // @ts-expect-error Prices.sort doesn't work properly here. I think it should be Prices.sort((a, b) => compareDesc(a.expires_at, b.expires_at)))
    Prices.sort(compareDesc).find((price) => isBefore(now, price.expires_at)) ??
    null
  );
}
