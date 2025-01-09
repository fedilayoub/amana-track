import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Amanti",
  description:
    "Amanti is a tracking app for Amana deliveries in Morocco, by using tracking numbers or images with barcodes you can track your delivery anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pattern bg-no-repeat bg-cover h-[100vh]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <p className="text-sm text-neutral-400">
              Made with ❤️ by{" "}
              <a
                href="https://twitter.com/fedilayoub"
                target="_blank"
                rel="noopener noreferrer"
              >
                @fedilayoub
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
