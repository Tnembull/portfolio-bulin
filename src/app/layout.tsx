import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import { PortfolioProvider } from "@/context/PortfolioContext";
import JSONLDSchema from "@/components/JSONLDSchema";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://bulindev.tech"),
  title: {
    default: "Muhammad Nur Ashiddiqi - DevOps & Backend Engineer",
    template: "%s | Muhammad Nur Ashiddiqi",
  },
  description:
    "Official portfolio of Muhammad Nur Ashiddiqi. DevOps & Backend Engineer specializing in REST APIs, PostgreSQL optimization, Kubernetes orchestration, Docker containerization, and automated CI/CD pipelines.",
  keywords: [
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
  ],
  authors: [{ name: "Muhammad Nur Ashiddiqi" }],
  creator: "Muhammad Nur Ashiddiqi",
  publisher: "Muhammad Nur Ashiddiqi",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo/logo.png", type: "image/png" },
    ],
    apple: "/logo/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bulindev.tech",
    siteName: "Muhammad Nur Ashiddiqi - DevOps & Backend Engineer",
    title: "Muhammad Nur Ashiddiqi - DevOps & Backend Engineer",
    description:
      "DevOps & Backend Engineer creating high availability cloud infrastructure, automated pipelines, and containerized backend systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Nur Ashiddiqi - DevOps & Backend Engineer",
    description:
      "DevOps & Backend Engineer creating high availability cloud infrastructure, automated pipelines, and containerized backend systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
