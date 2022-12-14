import Logo from "./svg/Logo";

export function Footer() {
  return (
    <footer className="py-16 border-t-2">
      <div className="flex flex-col items-center justify-between px-4 mx-auto max-w-7xl lg:px-8 lg:flex-row">
        <div className="w-full max-w-xs mb-6 text-slate-900 lg:mb-0">
          <Logo />
        </div>

        <div>
          <p className="mt-6 text-base text-slate-500 md:mt-0">
            Copyright © 2022 Norfolk Developers, Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
