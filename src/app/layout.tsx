import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import NavigationWrapper from "@/components/NavigationWrapper";
import { PortfolioProvider } from "@/context/PortfolioContext";

const fontSans = {
  variable: "--font-sans",
  className: "font-sans",
};

const fontMono = {
  variable: "--font-mono",
  className: "font-mono",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bulindev.tech"),
  title: {
    default: "Muhammad Nur Ashiddiqi – DevOps Engineer",
    template: "%s | Muhammad Nur Ashiddiqi",
  },
  description:
    "Official portfolio of Muhammad Nur Ashiddiqi. DevOps Engineer specializing in Kubernetes, CI/CD pipelines, Cloud Infrastructure (AWS/GCP), Terraform, and High Availability System Architecture.",
  keywords: [
    "Muhammad Nur Ashiddiqi",
    "DevOps Engineer",
    "Cloud Engineer",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "GitHub Actions",
    "AWS",
    "GCP",
    "Infrastructure as Code",
    "Prometheus",
    "Grafana",
    "Site Reliability",
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
    siteName: "Muhammad Nur Ashiddiqi – DevOps Engineer",
    title: "Muhammad Nur Ashiddiqi – DevOps Engineer",
    description:
      "DevOps & Cloud Engineer creating high availability cloud infrastructure, automated pipelines, and Kubernetes container orchestration.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Nur Ashiddiqi – DevOps Engineer",
    description:
      "DevOps & Cloud Engineer creating high availability cloud infrastructure, automated pipelines, and Kubernetes container orchestration.",
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
        className={`${fontSans.variable} ${fontMono.variable} ${fontSans.className} antialiased bg-background text-foreground relative selection:bg-foreground selection:text-background min-h-screen`}
      >
        <PortfolioProvider>
          <LenisProvider>
            <NavigationWrapper>{children}</NavigationWrapper>
          </LenisProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
