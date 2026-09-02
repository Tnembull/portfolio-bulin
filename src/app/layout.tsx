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

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-FC0GRRZXY3";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPortfolioFromSupabase();
  const seo = data?.seo;
  const hero = data?.hero;

  const title =
    seo?.metaTitle ||
    `${hero?.name || "Muhammad Nur Ashiddiqi"} — ${hero?.role || "DevOps & Backend Engineer"}`;
  const description =
    seo?.metaDescription ||
    hero?.bio ||
    "Official portfolio of Muhammad Nur Ashiddiqi. DevOps & Backend Engineer specializing in REST APIs, PostgreSQL optimization, Kubernetes orchestration, Docker containerization, and automated CI/CD pipelines.";
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
        "Linux Server",
      ];
  const canonicalUrl = seo?.canonicalUrl || "https://bulindev.tech";
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImage = seo?.ogImage || "https://bulindev.tech/opengraph-image";
  const faviconUrl = seo?.faviconUrl || "/favicon.ico";
  const appleTouchIconUrl = seo?.appleTouchIconUrl || "/logo/logo.png";

  return {
    metadataBase: new URL(canonicalUrl),
    title: {
      default: title,
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
    icons: {
      icon: [
        { url: faviconUrl },
        { url: faviconUrl, type: "image/png" },
      ],
      apple: appleTouchIconUrl,
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
          type: ogImage.endsWith(".png") ? "image/png" : "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Tnembull",
      creator: "@Tnembull",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
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
