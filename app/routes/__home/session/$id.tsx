import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "@remix-run/react";
import { format } from "date-fns";
import { useRef } from "react";
import { SocialIcon } from "react-social-icons";
import { getSessionById } from "~/lib/schedule";
import { useIsomorphicLayoutEffect } from "~/lib/use-isomorphic-layout-effect";
import { useRouteData } from "~/lib/use-route-data";
import type { ScheduleData } from "~/lib/schedule.server";
import type { ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
};

function Dialog({ children }: DialogProps): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useIsomorphicLayoutEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="w-full bg-transparent p-0 backdrop:bg-black backdrop:bg-opacity-50"
      onClose={() =>
        navigate("../", {
          preventScrollReset: true,
        })
      }
    >
      <form
        className="mx-auto max-w-7xl overflow-hidden rounded-md bg-wave-pink text-white shadow-md"
        method="dialog"
      >
        {children}
      </form>
    </dialog>
  );
}

function DialogHeader({ title }: { title: string }): JSX.Element {
  return (
    <header className="flex justify-end p-4 ">
      <div className="flex-1">
        <h2 className="text-lg font-bold lg:text-2xl">{title}</h2>
      </div>
      <div>
        <button type="submit" className="font-bold">
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}

function NotFound(): JSX.Element {
  return (
    <Dialog>
      <DialogHeader title="404 - Session not found!" />
    </Dialog>
  );
}

export default function SessionModal() {
  const params = useParams();

  const data = useRouteData<{ schedule: ScheduleData }>("routes/__home");
  if (!data?.schedule) return <NotFound />;

  const session = getSessionById(data.schedule, params.id ?? "");
  if (!session) return <NotFound />;

  return (
    <Dialog>
      <DialogHeader title={session?.Title ?? "Untitled Session"} />

      {session.Description && (
        <div className="bg-white p-4 text-slate-900">
          {session.Description.split("\n\n").map(
            (line: string, key: number) => (
              <p className="mb-2" key={`session_description_${key}`}>
                {line}
              </p>
            )
          )}
        </div>
      )}

      <div className="bg-slate-300 p-4 text-slate-900">
        {session?.Start && (
          <div className="mb-4">
            <p className="text-xl">
              In the {session.Track} on{" "}
              {format(new Date(session.Start), "do LLLL")} at{" "}
              {format(new Date(session.Start), "HH:mm")}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          {session?.AvatarUrl[0] && (
            <div>
              <img
                className="w-24 rounded-full border-4 border-slate-900"
                alt={`${session.SpeakerNames.join(
                  ", "
                )} is at nor(DEV): con 2023`}
                src={session.AvatarUrl[0]}
              />
            </div>
          )}

          {!!session?.SpeakerNames.length && (
            <div>
              <h4 className="text-2xl font-bold tracking-tight">
                {session.SpeakerNames.join(", ")}
              </h4>

              <ul className="flex gap-2 py-2">
                {session.Twitter[0] && (
                  <li>
                    <SocialIcon
                      url={session.Twitter[0]}
                      fgColor="white"
                      className="!h-12 !w-12"
                    />
                  </li>
                )}

                {session.LinkedIn[0] && (
                  <li>
                    <SocialIcon
                      url={session.LinkedIn[0]}
                      fgColor="white"
                      className="!h-12 !w-12"
                    />
                  </li>
                )}

                {session.Website[0] && (
                  <li>
                    <SocialIcon
                      url={session.Website[0]}
                      fgColor="white"
                      className="!h-12 !w-12"
                    />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
