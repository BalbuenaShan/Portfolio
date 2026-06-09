import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Shan Balbuena | Developer",
  description:
    "A modern minimalist portfolio for a full stack developer building polished web products.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background theme-transition">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = 'light';
    var root = document.documentElement;
    root.classList.remove('dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (error) {}
})();
`,
          }}
        />
      </head>
      <body className="min-h-dvh bg-background font-sans antialiased text-foreground">
        <ThemeProvider>
          <Preloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
