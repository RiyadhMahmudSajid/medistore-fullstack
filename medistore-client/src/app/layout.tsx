import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemesProvider";
import { QueryProvider } from "@/provider/QueryClientProvider";
import CartProvider from "@/provider/CartProvider";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedPlus",
  description: "Buy Medicine Online",
  icons: {
    icon: "/document.png",
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>

            <CartProvider>

              {children}
              <Toaster richColors />
            </CartProvider>

          </QueryProvider>

        </ThemeProvider>




      </body>
    </html>
  );
}
