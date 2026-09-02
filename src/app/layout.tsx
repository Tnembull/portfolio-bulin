import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import { PortfolioProvider } from "@/context/PortfolioContext";
import JSONLDSchema from "@/components/JSONLDSchema";
import { fetchPortfolioFromSupabase } from "@/lib/supabase";

import { Outfit, JetBrains_Mono } from "next/font/google";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1013" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
  ],
};

// Incremental Static Regeneration for blazing-fast response time (< 50ms)
export const revalidate = 60;

const DEFAULT_GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-FC0GRRZXY3";

function trimDescription(text: string, maxLength: number = 158): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + "...";
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPortfolioFromSupabase();
  const seo = data?.seo;
  const hero = data?.hero;

  const rawTitle =
    seo?.metaTitle ||
    `${hero?.name || "Muhammad Nur Ashiddiqi"} — ${hero?.role || "DevOps & Backend Engineer"}`;
  const rawDescription =
    seo?.metaDescription ||
    hero?.bio ||
    "DevOps & Backend Engineer specializing in REST APIs, PostgreSQL optimization, Kubernetes orchestration, Docker containerization, and automated CI/CD pipelines.";
  const description = trimDescription(rawDescription, 158);

  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((k) => k.trim())
    : [
        "Muhammad Nur Ashiddiqi",
        "DevOps Engineer",
        "Backend Developer",
        "Cloud Engineer",
        "Kubernetes",
        "Docker",
        "Terraform",
        "CI/CD",
        "GitHub Actions",
        "Node.js",
        "PostgreSQL",
      ];
  const canonicalUrl = "https://www.bulindev.tech";
  const ogTitle = seo?.ogTitle || rawTitle;
  const ogDescription = trimDescription(seo?.ogDescription || rawDescription, 160);
  const ogImage =
    seo?.ogImage && seo.ogImage.startsWith("http")
      ? seo.ogImage
      : "https://www.bulindev.tech/opengraph-image";
  const ogImageType = ogImage.endsWith(".webp")
    ? "image/webp"
    : ogImage.endsWith(".png")
    ? "image/png"
    : "image/jpeg";
  const faviconUrl = seo?.faviconUrl && seo.faviconUrl.startsWith("http") ? seo.faviconUrl : "/favicon.ico";
  const appleTouchIconUrl =
    seo?.appleTouchIconUrl && seo.appleTouchIconUrl.startsWith("http")
      ? seo.appleTouchIconUrl
      : "/apple-touch-icon.png";

  return {
    metadataBase: new URL(canonicalUrl),
    title: {
      default: rawTitle,
      template: `%s | ${hero?.name || "Muhammad Nur Ashiddiqi"}`,
    },
    description,
    keywords,
    authors: [{ name: hero?.name || "Muhammad Nur Ashiddiqi", url: canonicalUrl }],
    creator: hero?.name || "Muhammad Nur Ashiddiqi",
    publisher: hero?.name || "Muhammad Nur Ashiddiqi",
    alternates: {
      canonical: canonicalUrl,
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: faviconUrl },
      ],
      apple: [
        { url: appleTouchIconUrl, sizes: "180x180", type: "image/png" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: `${hero?.name || "Muhammad Nur Ashiddiqi"} — DevOps & Backend Engineer`,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
          type: ogImageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Tnembull",
      creator: "@Tnembull",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          alt: ogTitle,
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchPortfolioFromSupabase();
  const gaId = data?.seo?.googleAnalyticsId || DEFAULT_GA_ID;

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://unavatar.io" />
        <link rel="dns-prefetch" href="https://unavatar.io" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSans.className} antialiased bg-background text-foreground relative selection:bg-accent selection:text-background min-h-screen`}
      >
        {/* Dynamic Google tag (gtag.js) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-text focus:font-mono focus:font-bold focus:rounded-md"
        >
          Skip to main content
        </a>
        <JSONLDSchema />
        <PortfolioProvider>
          <NavigationWrapper>{children}</NavigationWrapper>
        </PortfolioProvider>
      </body>
    </html>
  );
}
