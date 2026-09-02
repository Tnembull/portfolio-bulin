"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (isHidden) {
    return <>{children}</>;
  }

  const showFooter = pathname !== "/";

  return (
    <>
      {pathname !== "/" && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
