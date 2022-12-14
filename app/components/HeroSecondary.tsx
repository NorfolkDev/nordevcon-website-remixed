import { Link } from "@remix-run/react";
import Logo from "./svg/Logo";
import WideWaves from "./svg/WideWaves";

export function HeroSecondary({ title }: { title: string }) {
  return (
    <div className="relative mb-[10vw] py-12 bg-slate-900">
      <div className="p-4 mx-auto max-w-7xl">
        <div className="max-w-xs mb-8 text-white">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <h1 className="block mb-8 text-5xl font-extrabold leading-normal tracking-tight text-white">
          {title}
        </h1>
      </div>

      <div className="absolute inset-0 top-full">
        <WideWaves />
      </div>
    </div>
  );
}
