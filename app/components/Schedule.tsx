import format from "date-fns/format";
import Star from "./svg/Star";
import config from "../config.json";
import { useStickyState } from "~/lib/use-sticky-state";
import { clsx } from "clsx";
import type { ScheduleData } from "~/lib/schedule.server";
import { Link } from "@remix-run/react";
import { createContext, useContext } from "react";
import { TRACKS } from "~/lib/constants";

function Nav() {
  return (
    <ol key="main" className="flex justify-between flex-grow">
      {Object.entries(TRACKS).map(([trackName, track]) => (
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
        className="flex px-4 py-2 ml-4 font-bold text-white rounded-md bg-wave-purple"
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
            <h3 className="pt-2 text-2xl leading-none text-gray-600 align-top tabular-nums">
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
            style={{
              borderColor: TRACKS[talk.Track as keyof typeof TRACKS]?.border,
            }}
          >
            {talk.TopicNames.length > 0 && (
              <div className="mb-2">
                <span className="p-1 text-sm font-bold uppercase rounded bg-cyan-200 text-cyan-700">
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
                  <Link to="/session/10" className="leading-6">
                    {talk.Title}
                  </Link>
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
  schedule: ScheduleData;
  isSharing?: boolean;
}

export function Schedule({ schedule, isSharing = false }: ScheduleProps) {
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
      <section className="relative px-4 pt-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:pt-20">
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
