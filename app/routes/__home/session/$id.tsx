import { useNavigate } from "@remix-run/react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "~/lib/use-isomorphic-layout-effect";

export default function SessionModal() {
  // return <Schedule schedule={deserializeSchedule(schedule)} isSharing />;
  const dialog = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useIsomorphicLayoutEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="backdrop:bg-black backdrop:bg-opacity-50"
      onClose={() =>
        navigate("../", {
          preventScrollReset: true,
        })
      }
    >
      <p>Shits and giggles</p>
    </dialog>
  );
}
