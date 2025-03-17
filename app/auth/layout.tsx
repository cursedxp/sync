"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="relative h-full w-1/2">
        <Image
          src={
            pathname === "/auth/login"
              ? "/images/auth/cayley-nossiter-LO3IuL-wgME-unsplash.jpg"
              : "/images/auth/toa-heftiba-l_ExpFwwOEg-unsplash.jpg"
          }
          alt="logo"
          fill
          className="w-full h-full object-cover filter brightness-145"
          priority
        />
      </div>
      <div className="w-1/2 p-40">{children}</div>
    </div>
  );
}
