import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { signOut, auth } from '@/auth';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-lg font-semibold"></a>
            <div className="hidden md:flex space-x-4">
              <a href="/performances" className="text-gray-300 hover:text-white">Performances</a>
              <a href="/singers" className="text-gray-300 hover:text-white">Singers</a>
              <a href="/conductors" className="text-gray-300 hover:text-white">Conductors</a>
              <a href="/choruses" className="text-gray-300 hover:text-white">Chors</a>
              <a href="/orchestras" className="text-gray-300 hover:text-white">Orchestras</a>
              <a href="/composers" className="text-gray-300 hover:text-white">Composers</a>
              <a href="/works" className="text-gray-300 hover:text-white">Works</a>
              <a href="/venues" className="text-gray-300 hover:text-white">Venues</a>
              {session?.user ? (
                <form action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button
                  className="flex grow items-center justify-center rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-1 md:px-1"
                >
                  <div>Sign Out</div>
                </button>
              </form>
              ) : (
                <a href="/login" className="text-gray-300 hover:text-white">Login</a>
              )} 
            </div>
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <div className="p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
