import { FlipWords } from "@/components/ui/flip-words";
const Footer = () => {
  const words = ["Next.js", "Tailwind CSS", "Shadcn UI", "❤️"];
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <p className="text-sm text-neutral-400">
        Made with <FlipWords words={words} /> by{" "}
        <a
          href="https://fedilayoub.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          @fedilayoub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
