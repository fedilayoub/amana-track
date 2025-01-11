import { FlipWords } from "@/components/ui/flip-words";
const Footer = () => {
  const words = ["Next.js", "Tailwind CSS", "Shadcn UI", "❤️"];
  return (
    <footer className="flex items-center justify-center h-[4.5rem]">
      <div className="text-sm text-neutral-400 text-center w-full">
        Made with <FlipWords words={words} /> by{" "}
        <a
          href="https://fedilayoub.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          @fedilayoub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
