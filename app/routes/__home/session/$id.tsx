import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "@remix-run/react";
import { format } from "date-fns";
import { useRef } from "react";
import { SocialIcon } from "react-social-icons";
import { TalkTopics } from "~/components/Schedule";
import { Social } from "~/components/Sponsors";
import { getSessionById } from "~/lib/schedule";
import { ScheduleData } from "~/lib/schedule.server";
import { useIsomorphicLayoutEffect } from "~/lib/use-isomorphic-layout-effect";
import { useRouteData } from "~/lib/use-route-data";

export default function SessionModal() {
  const params = useParams();

  // @TODO: Done do the TypeScript things
  const { schedule } = useRouteData<{ schedule: Array<string> }>(
    "routes/__home"
  );
  const session = getSessionById(schedule, params.id ?? "");
  const dialog = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useIsomorphicLayoutEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="w-full p-0 bg-transparent"
      onClose={() =>
        navigate("../", {
          preventScrollReset: true,
        })
      }
    >
      <form
        className="mx-auto overflow-hidden rounded-md shadow-md max-w-7xl bg-wave-pink backdrop:bg-black backdrop:bg-opacity-50"
        method="dialog"
      >
        <header className="flex justify-end p-4 mb-4 text-white">
          <div className="flex-1">
            <h2 className="text-lg font-bold lg:text-2xl">{session.Title}</h2>
          </div>
          <div>
            <button type="submit" className="font-bold">
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>
        </header>

        <div className="p-4 bg-white">
          {session.Description.split("\n\n").map(
            (line: string, key: number) => (
              <p className="mb-2" key={`session_description_${key}`}>
                {line}
              </p>
            )
          )}
        </div>

        <div className="p-4 bg-slate-200">
          <div className="flex">
            <p className="flex-1 text-xl">
              {session.Track}
              {` `}
              {format(new Date(session.Start), "do LLLL HH:mm")}
            </p>
          </div>

          <h4 className="text-lg font-bold tracking-tight">
            {session.SpeakerNames.join(", ")}
          </h4>

          {/* <Social organisation={session} /> */}
          {/* <SocialIcon url={session.Twitter} fgColor="white" /> */}
          <ul className="flex gap-2 py-2">
            {session.Twitter[0] && (
              <li>
                <SocialIcon
                  url={session.Twitter[0]}
                  fgColor="white"
                  className="!h-8 !w-8"
                />
              </li>
            )}

            {session.LinkedIn[0] && (
              <li>
                <SocialIcon
                  url={session.LinkedIn[0]}
                  fgColor="white"
                  className="!h-8 !w-8"
                />
              </li>
            )}
          </ul>
        </div>
      </form>
    </dialog>
  );
}
