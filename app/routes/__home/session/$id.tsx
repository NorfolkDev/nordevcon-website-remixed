import { useNavigate } from "@remix-run/react";
import { useLayoutEffect, useRef } from "react";

export default function SessionModal() {
  // return <Schedule schedule={deserializeSchedule(schedule)} isSharing />;
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useNavigate();

  useLayoutEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="backdrop:bg-black backdrop:bg-opacity-50"
      onClose={() => router(-1)}
    >
      <p>Shits and giggles</p>
    </dialog>
  );
}
