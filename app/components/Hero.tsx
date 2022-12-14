import AcademicCapIcon from "@heroicons/react/24/outline/AcademicCapIcon";
import BeakerIcon from "@heroicons/react/24/outline/BeakerIcon";
import RocketLaunchIcon from "@heroicons/react/24/outline/RocketLaunchIcon";
import CodeBracketIcon from "@heroicons/react/24/outline/CodeBracketIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import ChartBarSquareIcon from "@heroicons/react/24/outline/ChartBarSquareIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CommandLineIcon from "@heroicons/react/24/outline/CommandLineIcon";
import City from "./svg/City";
import Logo from "./svg/Logo";
import Crab from "./svg/Crab";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const Count = 15;
const Icons = [
  AcademicCapIcon,
  BeakerIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  CircleStackIcon,
  CommandLineIcon,
  Crab,
];

function random(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomStyles() {
  let size = random(5, 2);
  let hue = random(360);
  let time = random(5000, 2000);
  let delay = random(720, 30);

  let start = [random(100), random(60, 40)];
  let end = [
    random(start[0] + 5, start[0] - 5),
    random(start[1] - 40, start[1] - 20),
  ];

  let icon = random(Icons.length - 1, 0);

  return { size, hue, time, delay, start, end, icon };
}

type Styles = ReturnType<typeof randomStyles>;

interface IconProps extends Styles {
  click: () => void;
}

function Icon({ size, hue, time, delay, start, end, icon, click }: IconProps) {
  let IconComponent = Icons[icon];

  return (
    <div
      className="rise cursor-crosshair"
      style={
        {
          "--size": `${size}vh`,
          "--x-start": `${start[0]}vw`,
          "--y-start": `${start[1]}vh`,
          "--x-end": `${end[0]}vw`,
          "--y-end": `${end[1]}vh`,
          "--time": `${time}ms`,
          "--delay": `-${delay}s`,
          "--color": `hsl(${hue}deg 65% 70% / 70%)`,
          "--shadow": `hsl(${hue}deg 65% 50% / 50%)`,
        } as CSSProperties
      }
      onClick={click}
    >
      <IconComponent />
    </div>
  );
}

export function Hero() {
  let [icons, setIcons] = useState<Styles[]>([]);
  let [count, setCount] = useState(0);

  useEffect(() => {
    setIcons(Array.from({ length: Count }, () => randomStyles()));
  }, []);

  return (
    <div className="relative flex flex-col justify-between overflow-hidden lg:min-h-screen bg-slate-900">
      {count > 0 && (
        <div className="absolute top-0 right-0 p-4 text-5xl font-extrabold text-yellow-500">
          <p>{count}</p>
        </div>
      )}

      {count >= 99 && (
        <div className="absolute inset-0 z-50 flex flex-col justify-center p-4 text-center text-white bg-opacity-90 bg-slate-900">
          <div className="max-w-5xl mx-auto">
            {/*
             * You are a cheater - well done ;)
             */}
            <h2 className="mb-4 text-4xl font-extrabold">
              &quot;Congratulations&quot;!
            </h2>

            <p className="mb-8 text-xl">
              For your perservance you&apos;ve unlocked a discount! Use the code{" "}
              <span className="font-bold">clicky-mcclickface</span> at checkout
              to get a 10% discount on any purchase. Or click the big red button
              below!
            </p>

            <a
              href="https://ti.to/norfolkdevelopers/nordevcon-23/discount/clicky-mcclickface"
              className="block p-4 text-xl font-extrabold bg-red-500 rounded"
            >
              Claim my 10% discount
            </a>
          </div>
        </div>
      )}

      <div className="absolute inset-0 text-white">
        {icons.map((styles, i) => (
          <Icon
            key={`icon_${i}`}
            click={() => setCount(() => count + 1)}
            {...styles}
          />
        ))}
      </div>
      <div className="z-10 flex flex-col gap-8 p-4 py-16 pointer-events-none select-none md:p-16 md:pt-32 md:mb-16 ">
        <div className="max-w-sm text-white md:max-w-lg">
          <Logo />
        </div>

        <div>
          <p className="inline text-5xl font-extrabold leading-normal tracking-tight text-transparent bg-gradient-to-r from-wave-purple via-wave-pink to-wave-orange bg-clip-text font-display bg-move">
            East Anglia&apos;s biggest tech conference
          </p>
        </div>

        <div>
          <p className="text-4xl font-extrabold tracking-tight text-white">
            23rd &amp; 24th February 2023
          </p>
        </div>
      </div>
      <div className="z-30 -ml-24 text-white pointer-events-none -mr-96 lg:mx-0">
        <City />
      </div>
    </div>
  );
}
