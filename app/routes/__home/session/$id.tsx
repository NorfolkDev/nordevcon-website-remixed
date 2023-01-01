import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/server-runtime";
import { format } from "date-fns";
import { useRef } from "react";
import { SocialIcon } from "react-social-icons";
import { AirtableApi } from "~/lib/airtable.server";
import { useIsomorphicLayoutEffect } from "~/lib/use-isomorphic-layout-effect";

export async function loader({ context, params }: LoaderArgs) {
  const airtable = new AirtableApi(context as any);
  const schedule = await airtable.getSchedule();
  const { id } = params;

  const session = schedule.find((s) => s.fields.id.toString() === id);

  if (!session) throw new Response("Session not found", { status: 404 });

  return json({
    session: session.fields,
  });
}

export default function SessionModal() {
  const { session } = useLoaderData<typeof loader>();
  const dialog = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useIsomorphicLayoutEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="w-full p-0 bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
      onClose={() =>
        navigate("../", {
          preventScrollReset: true,
        })
      }
    >
      <form
        className="mx-auto overflow-hidden rounded-md shadow-md max-w-7xl bg-wave-pink"
        method="dialog"
      >
        <header className="flex justify-end p-4 text-white">
          <div className="flex-1">
            <h2 className="text-lg font-bold lg:text-2xl">{session.Title}</h2>
          </div>
          <div>
            <button type="submit" className="font-bold">
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>
        </header>

        {session.Description && (
          <div className="p-4 bg-white">
            {session.Description.split("\n\n").map(
              (line: string, key: number) => (
                <p className="mb-2" key={`session_description_${key}`}>
                  {line}
                </p>
              )
            )}
          </div>
        )}

        <div className="p-4 bg-slate-300">
          <div className="mb-4">
            <p className="text-xl">
              In the {session.Track} on{" "}
              {format(new Date(session.Start), "do LLLL")} at{" "}
              {format(new Date(session.Start), "HH:mm")}
            </p>
          </div>

          <div className="flex gap-4">
            {session.AvatarUrl[0] && (
              <div>
                <img
                  className="w-24 border-4 rounded-full border-slate-900"
                  alt={`${session.SpeakerNames.join(
                    ", "
                  )} is at nor(DEV): con 2023`}
                  src={session.AvatarUrl[0]}
                />
              </div>
            )}
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
          </div>
        </div>
      </form>
    </dialog>
  );
}
