import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GateProvider from "@/components/GateProvider";
import { profile } from "@/lib/profile";
import "./globals.css";

// Single sans-serif typeface across the whole site.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Product designer specializing in complex software — turning ambiguous, high-complexity problems into interfaces that scale.";

export const metadata: Metadata = {
  // TODO(paritosh): set your real domain once deployed so OG/Twitter image
  // URLs resolve to an absolute address.
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} antialiased`}
    >
      <body>
        <div className="ambient" aria-hidden />
        <div className="grain" aria-hidden />
        <GateProvider>
          <div className="relative z-[2] flex min-h-dvh flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </GateProvider>
        <Analytics />
      </body>
    </html>
  );
}
