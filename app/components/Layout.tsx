import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-blue-50">{children}</main>;
}
