import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";

import QueryProvider from "@/components/providers/QueryProvider";
import Navbar from "@/components/(navbar)/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>NFInsight</title>
      </head>
      <body>
        <main>
          <QueryProvider>
            <Navbar />
            {children}
            <Analytics />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
