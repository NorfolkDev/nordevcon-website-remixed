import format from "date-fns/format";
import Star from "./svg/Star";
import config from "../config.json";
import { useStickyState } from "~/lib/use-sticky-state";
import { clsx } from "clsx";
import type { ScheduleData } from "~/lib/schedule";
import { parseSchedule, Tracks } from "~/lib/schedule";
import { Link } from "@remix-run/react";
import type { ScheduleRecord } from "~/lib/airtable.server";
import { createContext, useContext } from "react";

function Nav() {
  return (
    <ol key="main" className="flex flex-grow justify-between">
      {Object.entries(Tracks).map(([trackName, track]) => (
        <li className="flex items-center" key={trackName}>
          <span className="flex items-center">
            <span
              className={`mr-2 inline-block h-4 w-4`}
              style={{ backgroundColor: track.background }}
            ></span>
            {trackName}
          </span>
        </li>
      ))}
    </ol>
  );
}

interface Wishlistprops {
  wishlist: number[];
  share: URLSearchParams;
}

function Wishlist({ wishlist, share }: Wishlistprops) {
  if (wishlist.length === 0) return null;

  return (
    <div>
      <Link
        to={"/schedule?" + decodeURIComponent(share.toString())}
        className="ml-4 flex rounded-md bg-wave-purple px-4 py-2 font-bold text-white"
      >
        View
        <Star filled={true} />
      </Link>
    </div>
  );
}

interface DayProps {
  datetime: Date;
  sessions: ScheduleData[number]["sessions"];
}

function Day({ datetime, sessions }: DayProps) {
  let date = format(datetime, "do LLLL");

  return (
    <>
      <li key={`marker_${date}`} className="py-4 text-2xl font-bold">
        {date}
      </li>

      {sessions.map((session, i) => (
        <li key={`sessions_${date}_${i}`} className="flex py-2">
          <div className="mr-8">
            <h3 className="pt-2 align-top text-2xl tabular-nums leading-none text-gray-600">
              {format(session.datetime, "HH:mm")}
            </h3>
          </div>

          <div className="flex-grow">
            <Talks talks={session.talks} />
          </div>
        </li>
      ))}
    </>
  );
}

interface TalksProps {
  talks: ScheduleData[number]["sessions"][number]["talks"];
}

function Talks({ talks }: TalksProps) {
  const { wishlist, addWishlist, isSharing } = useContext(WishlistContext);

  return (
    <ol className="xl:flex">
      {talks.map((talk) => {
        const isWishlist = wishlist.includes(talk.id);

        return (
          <li
            key={`talk_${talk.id}`}
            className={`relative p-2 ${
              talks.length > 1
                ? "mb-2 border-l-8 pl-2 xl:m-0 xl:w-1/3"
                : "w-full border-l-8"
            }`}
            // @ts-expect-error
            style={{ borderColor: Tracks[talk.Track]?.border }}
          >
            {talk.TopicNames.length > 0 && (
              <div className="mb-2">
                <span className="rounded bg-cyan-200 p-1 text-sm font-bold uppercase text-cyan-700">
                  {talk.TopicNames.join(", ")}
                </span>
              </div>
            )}

            {talk.Live && (
              <div>
                <h3
                  className={`align-center flex items-start justify-between font-bold leading-none${
                    talk.Cancelled ? " line-through" : ""
                  }`}
                >
                  <span className="leading-6">{talk.Title}</span>
                  {!isSharing && talk.Title && talk.Track && (
                    <button
                      className="ml-2 text-yellow-500"
                      onClick={() => addWishlist(talk.id)}
                    >
                      <Star filled={isWishlist} />
                    </button>
                  )}
                </h3>
                {!!talk.SpeakerNames.length && (
                  <p className="text-gray-900">
                    {talk.SpeakerNames.join(", ")}
                  </p>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

const WishlistContext = createContext({
  wishlist: [] as number[],
  addWishlist: (_value: number) => {},
  isSharing: false,
});

interface ScheduleProps {
  data: ScheduleRecord[];
  filter?: string[];
  isSharing?: boolean;
}

export function Schedule({
  data,
  filter = [],
  isSharing = false,
}: ScheduleProps) {
  const schedule = parseSchedule(data, filter);

  const ScheduleKey = config.schedule_key;
  const [wishlist, setWishlist] = useStickyState([] as number[], ScheduleKey);
  const share = new URLSearchParams({
    share: wishlist.toString(),
  });

  // @TODO: Ensure only 1 item per track can be saved
  const addWishlist = (add: number) =>
    wishlist.includes(add)
      ? setWishlist(wishlist.filter((id) => id !== add))
      : setWishlist([...wishlist, add]);

  return (
    <WishlistContext.Provider value={{ wishlist, addWishlist, isSharing }}>
      <section className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <ol
          className={clsx({
            "sticky top-0 right-0 z-10 flex border-b-2 bg-white py-4 px-4":
              !isSharing,
          })}
        >
          <Nav />

          {!isSharing && <Wishlist wishlist={wishlist} share={share} />}
        </ol>
        <ol>
          {schedule.map((day, i) => (
            <Day
              key={`schedule_day_${i}`}
              datetime={day.datetime}
              sessions={day.sessions}
            />
          ))}
        </ol>
      </section>
    </WishlistContext.Provider>
  );
}
