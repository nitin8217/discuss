import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import HeaderPage from "@/components/header";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { SearchLoadingProvider } from "@/components/providers/search-loading-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ParticleAnimation from "@/components/ui/particle-animation";
import PageTransition from "@/components/ui/page-transition";

export const metadata: Metadata = {
  title: "Discuss - Modern Forum",
  description: "A modern discussion platform with ultra-modern UI",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className="antialiased min-h-screen transition-colors duration-300 dark"
      >
        <ThemeProvider>
          <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
            <ParticleAnimation />
            <div className="relative z-10 container mx-auto max-w-6xl px-4">
              <SessionProvider>
                <SearchLoadingProvider>
                  <LoadingProvider>
                    <HeaderPage />
                    <main className="py-6">
                      <PageTransition>
                        {children}
                      </PageTransition>
                    </main>
                  </LoadingProvider>
                </SearchLoadingProvider>
              </SessionProvider>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
