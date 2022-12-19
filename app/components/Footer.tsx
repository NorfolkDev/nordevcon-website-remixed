import Logo from "./svg/Logo";

export function Footer() {
  return (
    <footer className="border-t-2 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 lg:flex-row lg:px-8">
        <div className="mb-6 w-full max-w-xs text-slate-900 lg:mb-0">
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
