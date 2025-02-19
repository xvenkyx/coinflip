import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-600 text-white">
          <div className="mx-auto flex items-center gap-6 p-4">
            {/* Branding */}
            <div className="flex items-center space-x-2">
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-blue-600 font-bold">
                C
              </div>
              <span className="text-lg font-semibold tracking-wide">
                CoinFlip
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-6">
              <a
                href="/"
                className="text-md font-medium hover:text-gray-300 transition-all"
              >
                Home
              </a>
              <a
                href="/rates"
                className="text-md font-medium hover:text-gray-300 transition-all"
              >
                Rates
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
