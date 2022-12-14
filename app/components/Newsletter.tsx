export function Newsletter() {
  return (
    <div className="py-16 sm:py-24">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-wave-pink" />
          <svg
            className="absolute -ml-3 text-wave-orange top-8 left-1/2"
            width={404}
            height={392}
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width={404}
              height={392}
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
            />
          </svg>
        </div>
        <div className="px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative px-6 py-10 overflow-hidden rounded-lg shadow-xl bg-slate-900 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-slate-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-slate-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Subscribe to our newsletter
                </h2>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-left text-slate-200">
                  <span className="mr-2">📰</span>Get the latest updates
                  <br />
                  <span className="mr-2">📣</span>Speaker announcements &amp;
                  interviews
                  <br />
                  <span className="mr-2">🎁</span> Win hampers &amp; merch in
                  giveaways
                </p>
              </div>
              <form
                method="POST"
                action="https://dev.us16.list-manage.com/subscribe/post?u=2218b6b7ecab15ba988c8ca7e&amp;id=bd28db2956&amp;f_id=003778e0f0"
                className="mt-12 sm:mx-auto sm:flex sm:max-w-lg"
              >
                <div className="flex-1 min-w-0">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    name="EMAIL"
                    className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full px-5 py-3 text-base font-medium text-white border border-transparent rounded-md shadow bg-slate-500 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-600 sm:px-10"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function Newsletter() {
//   return (
//     <div className="px-4 py-12 mx-auto bg-gray-900 rounded-md max-w-7xl sm:px-6 lg:flex lg:items-center lg:py-16 lg:px-8">
//       <div className="lg:w-0 lg:flex-1">
//         <h2
//           className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
//           id="newsletter-headline"
//         >
//           Sign up for our newsletter
//         </h2>
//         <p className="max-w-3xl mt-3 text-lg leading-6 text-gray-300">
//           Get the latest updates &amp; speaker announcements. Win hampers &amp;
//           merch in our giveaways. Subscribe to our newsletter today.
//         </p>
//       </div>
//       <div className="mt-8 lg:mt-0 lg:ml-8">
//         <form
//           method="POST"
//           action="https://dev.us16.list-manage.com/subscribe/post?u=2218b6b7ecab15ba988c8ca7e&amp;id=bd28db2956&amp;f_id=003778e0f0"
//           className="sm:flex"
//         >
//           <label htmlFor="email-address" className="sr-only">
//             Email address
//           </label>
//           <input
//             id="email-address"
//             name="EMAIL"
//             type="email"
//             autoComplete="email"
//             required
//             className="w-full px-5 py-3 placeholder-gray-500 border border-transparent rounded-md focus:border-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:max-w-xs"
//             placeholder="Enter your email"
//           />
//           <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
//             <button
//               type="submit"
//               className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
//             >
//               Subscribe
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
