import { ThemeSwitch } from "./ThemeSwitch";
import { Logo } from "./ui/logo";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="container mx-auto px-10 md:px-24 pt-10 flex justify-between items-center">
      <Link className="flex items-center gap-2" href="/">
        <Logo />{" "}
        <p className="hidden md:block text-black dark:text-white font-semibold font-[family-name:var(--font-geist-sans)]">
          Amanti
        </p>
      </Link>
      <ThemeSwitch />
    </div>
  );
};
