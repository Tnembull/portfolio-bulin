import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Control Panel | Muhammad Nur Ashiddiqi",
  description: "DevOps Engineer Portfolio Control Panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
