export function Venue() {
  return (
    <div className="px-4 pt-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:pt-20">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
        The Venue
      </h2>

      <p className="mb-2 text-2xl text-slate-900">
        We return to the King&apos; Centre in 2023. Their wonderful team support
        us in bringing the conference to you, and they make a fantasic sarnie.
        Located on Kings Street, a{" "}
        <a
          href="https://www.youtube.com/watch?v=jEelY9KNlu0&"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          pedestrianised street in Norwich city centre
        </a>
        , The building is accessible, and has a great cafe. A free lunch will be
        provided on both days, with pots of coffee &amp; tea available on tap
        all day.
      </p>

      <p className="text-2xl text-slate-900"></p>

      <ol className="grid grid-cols-4 gap-4 pt-8">
        <li className="col-span-2 lg:col-span-1 aspect-w-3 aspect-h-2">
          <img
            className="object-cover rounded-lg shadow-lg"
            src="/img/kings-center_1.jpg"
            alt=""
          />
        </li>

        <li className="col-span-2 lg:col-span-1 aspect-w-3 aspect-h-2">
          <img
            className="object-cover rounded-lg shadow-lg"
            src="/img/kings-center_2.jpg"
            alt=""
          />
        </li>

        <li className="col-span-2 lg:col-span-1 aspect-w-3 aspect-h-2">
          <img
            className="object-cover rounded-lg shadow-lg"
            src="/img/kings-center_3.jpg"
            alt=""
          />
        </li>

        <li className="col-span-2 lg:col-span-1 aspect-w-3 aspect-h-2">
          <img
            className="object-cover rounded-lg shadow-lg"
            src="/img/kings-center_4.jpg"
            alt=""
          />
        </li>
      </ol>
    </div>
  );
}
