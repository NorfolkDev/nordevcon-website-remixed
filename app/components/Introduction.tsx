import Waves from "./svg/Waves";

export function Introduction() {
  return (
    <div className="relative pt-[10vw]">
      <div className="absolute -top-[5vw] z-20 w-full">
        <Waves />
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
        ></div>
        <div className="relative bg-gray-100 lg:bg-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
            <div className="mx-auto max-w-2xl pt-32 pb-12 lg:max-w-none lg:pb-32 lg:pt-64">
              <div className="lg:pr-16">
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                  Two days of talks on mobile, web, game, data science,{" "}
                  <span className="italic">humans</span>, startups &amp; more.
                </h2>
                <p className="mb-2 text-2xl text-slate-900">
                  Topics to interest and enthrall all; in a welcoming and
                  inclusive atmosphere. Friendships to kindle, friends to meet,
                  & connections to make!
                </p>

                <p className="text-xl text-slate-500">
                  We&apos;ll gather in Norwich to learn, discuss, and network
                  with an eclectic bunch of the best of East Anglia&apos;s tech
                  scene, joined by a group of international conference veterans.
                  We&apos;re bringing 35 sessions to The Kings&apos; Centre,
                  kicking off on the 23rd February 2023, and closing 24th
                  February 2023
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-48 w-full sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
          {/* @TODO: Optimise the image */}
          <img
            src="/img/audience.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
