import { Link } from "@remix-run/react";
import Logo from "./svg/Logo";
import WideWaves from "./svg/WideWaves";

export function HeroSecondary({ title }: { title: string }) {
  return (
    <div className="relative mb-[10vw] bg-slate-900 py-12">
      <div className="mx-auto max-w-7xl p-4">
        <div className="mb-8 max-w-xs text-white">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <h1 className="mb-8 block text-5xl font-extrabold leading-normal tracking-tight text-white">
          {title}
        </h1>
      </div>

      <div className="absolute inset-0 top-full">
        <WideWaves />
      </div>
    </div>
  );
}
