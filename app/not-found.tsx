import Link from "next/link";

export default function NotFound() {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full max-w-[100%] min-h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col justify-center w-full max-w-[100%] h-full gap-8 row-start-2 items-center">
            <p className="text-lg md:text-xl font-bold text-center">404 | Page Not Found</p>
            <Link className="underline" href="/">
              Go back to Home →
            </Link>
        </main>
      </div>
    );
  }