import type { Metadata } from "next";
import { Poppins, Amiri } from "next/font/google";
import "@/index.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GlobalGrain } from "@/components/layout/GlobalGrain";
import { buildMetadata } from "@/lib/metadata";
import { buildOrganizationJsonLd } from "@/lib/jsonLd";
import { getSiteSettings } from "@/lib/sanityQueries";
import { resolveEmailEntries } from "@/lib/contactEmails";
import { MQI_NAP } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings = null;
  let jsonLd = buildOrganizationJsonLd();
  try {
    settings = await getSiteSettings();
    const socialUrls = (settings?.socialLinks ?? []).map((s) => s.url);
    const primaryEmail = resolveEmailEntries(settings?.footerEmails, settings?.footerEmail)[0]?.email;
    jsonLd = buildOrganizationJsonLd(
      socialUrls,
      primaryEmail ?? MQI_NAP.email,
      settings?.footerPhone ?? MQI_NAP.phone,
    );
  } catch {
    // Fallback NAP from site constants
  }

  return (
    <html lang="en-CA" className={`${poppins.variable} ${amiri.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <AppProviders>
          <SiteSettingsProvider settings={settings}>
            <div className="relative flex min-h-screen flex-1 flex-col">
              <GlobalGrain />
              <Header />
              <div className="relative z-10 flex-1">{children}</div>
              <Footer />
            </div>
          </SiteSettingsProvider>
        </AppProviders>
      </body>
    </html>
  );
}
