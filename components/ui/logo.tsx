import Image from "next/image";

export const Logo = () => {
  return (
 <>
            <Image
             src="/logos/logo_amana_dark.svg"
             alt="Amana Track"
             width={120}
             height={30}
             className="w-10 h-auto hidden dark:block"
           />
           <Image
             src="/logos/logo_amana_light.svg"
             alt="Amana Track"
             width={120}
             height={30}
             className="w-10 h-auto block dark:hidden"
           />
 </>

  );
};
