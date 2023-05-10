import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-blue-50">
      <div className="bg-white fixed top-0 left-0 right-0 z-50 p-4 font-bold">
        <p>
          This is an archive of a previous conference - thanks for checking it
          out! You can see our current conference at{" "}
          <a className="underline" href="https://nordevcon.com">
            nordevcon.com
          </a>
        </p>
      </div>
      {children}
    </main>
  );
}
