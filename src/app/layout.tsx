// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Shield, Phone, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader"; // ⬅️ add this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salus Constructions Ltd",
  description: "Residential & commercial construction since 1990.",
};

const COMPANY = {
  name: "Salus Constructions Ltd",
  phone: "+44 7956 365717",
  phoneHref: "+447961540133",
  email: "info@salusconstruction.co.uk",
  address: "London, UK",
  founded: "1990",
  companyNo: "10902774",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top Bar */}
        <div className="w-full bg-slate-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between text-sm">
            <p className="opacity-90 flex items-center gap-2">
              <Shield className="h-4 w-4" /> • Full-service construction
            </p>
            <div className="flex items-center gap-4">
              <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-1 hover:opacity-80">
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1 hover:opacity-80">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Header (now mobile-friendly) */}
        <SiteHeader companyName={COMPANY.name} />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row justify-between text-sm text-slate-600 gap-6">
            <div>
              <p className="font-semibold">{COMPANY.name}</p>
              <p>
                Suite 401-402<br />
                Cumberland House<br />
                80 Scrubs Lane<br />
                London<br />
                NW10 6RF
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <p>Company No. {COMPANY.companyNo}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
