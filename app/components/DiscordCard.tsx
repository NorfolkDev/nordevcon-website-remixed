import DiscordIcon from "./svg/DiscordIcon";

export function DiscordCard() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
      <div className="flex flex-col gap-8 overflow-hidden rounded-lg bg-[#5865F2] p-12 text-white shadow-lg lg:grid lg:grid-cols-4">
        <div className="col-span-3 lg:self-center">
          <h2 className="text-3xl leading-4 tracking-tight sm:text-4xl">
            <span className="block font-bold">
              Join the conversation ahead of time
            </span>
            <span className="mt-2 block">
              The &ldquo;Conference Corridor experience&rdquo; pre &amp; post
              conference.
            </span>
          </h2>
          <p className="mt-4 text-lg font-bold text-indigo-100">
            Our friendly, active and helpful Discord server. We discuss topics
            related to software development, as well as share resources, tips
            and tricks. Whether you&apos;re a beginner or a professional, our
            members are here to help you out!
          </p>
          <a
            href="https://nor.dev/discord"
            className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-12 py-3 text-lg font-bold text-indigo-600 shadow hover:bg-indigo-50"
          >
            Join the server
          </a>
        </div>

        <div className="col-span-1 -mt-64 opacity-10 lg:mt-0 lg:opacity-100">
          <div className="ml-auto max-w-xs rotate-12 drop-shadow-md">
            <DiscordIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
