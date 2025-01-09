import Image from "next/image";
import { Spotlight } from "@/components/Spotlight";
import { Cover } from "@/components/ui/cover";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full max-w-[100%] min-h-[80vh] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full max-w-[100%] gap-8 row-start-2 items-center sm:items-start">
        <Spotlight
          className="hidden dark:block -top-40 left-0 md:left-60 md:-top-0 max-w-[100%]"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent  bg-gradient-to-b from-neutral-50 to-neutral-700 bg-opacity-50 dark:from-neutral-50 dark:to-neutral-400 dark:bg-opacity-50">
            Know where your
            <br />
            <Cover>deliveries</Cover> are, anytime.
          </h1>
          <p className="my-4 font-normal text-base text-neutral-400 max-w-lg text-center mx-auto">
            Stay on top of every delivery. Use a tracking number or simply scan
            the barcode to get instant updates on your delivery.
          </p>
          <div className="w-full flex justify-center mt-10">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="div"
              className="dark:bg-neutral-800 bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <Link href="/track">Track your delivery</Link>
              <Image
                aria-hidden
                src="/icons/tracker.svg"
                alt="tracker icon"
                width={24}
                height={24}
              />
            </HoverBorderGradient>
          </div>
        </div>
      </main>
    </div>
  );
}
