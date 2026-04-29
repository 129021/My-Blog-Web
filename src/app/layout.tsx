import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { PageTransition } from "@/components/effects/PageTransition";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) theme = 'system';
                  var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] antialiased">
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-16">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
            <ScrollToTop />
            <CursorGlow />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
