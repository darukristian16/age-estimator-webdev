import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";
import {Navbar} from "@/components/navbar"
import { Link } from "@nextui-org/link";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Age Estimator",
  description: "Age Estimator by Telkom Indonesia",
};

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='light'>
      <head/>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar/>
            <Suspense fallback={<Loading/>}>
              <main className="flex-grow">
                {children}
              </main>
            </Suspense>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://www.telkom.co.id/"
                title="Telkom Indonesia Homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">Telkom Indonesia</p>
              </Link>
            </footer>     
          </div>
        </Providers>
      </body>
    </html>
  );
}
