import type { Metadata } from "next";
import { Reem_Kufi } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
const reem = Reem_Kufi({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aether — In Heaven Where We All Connect",
  description:
    "Aether is the next-gen social media platform where people connect, share, blog, and make new friends in a space designed for Bangladesh and beyond.",
  keywords: [
    "Aether",
    "Social Media Bangladesh",
    "Connect with Friends",
    "Bangladeshi Social Platform",
    "Aether Blog",
    "Community Network",
    "Post and Share",
    "Next Gen Social Media",
    "Global Social Platform",
    "Tech Community Bangladesh",
  ],
  authors: [{ name: "Aether Team", url: "https://aetherorigin.vercel.app" }], // Change URL to yours
  creator: "Aether",
  openGraph: {
    title: "Aether — In Heaven Where We All Connect",
    description:
      "Join Aether, a social platform crafted for Bangladesh and the world to connect, share thoughts, and make friends in a modern and meaningful way.",
    url: "https://aetherorigin.vercel.app", // Change URL
    siteName: "Aether",
    locale: "en_BD",
    type: "website",
    images: [
      {
        url: "/aether.png", // Placeholder for OG Image (1200x630)
        width: 1200,
        height: 630,
        alt: "Aether — In Heaven Where We All Connect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aether — In Heaven Where We All Connect",
    description:
      "Aether is the social media where you can post, blog, connect, and grow a community. Built for Bangladesh, open to the world.",
    images: ["/twitter-aether.png"], // Placeholder for Twitter Image (800x418)
    creator: "@aether", // Optional, set later
  },
  metadataBase: new URL("https://aetherorigin.vercel.app"), // Update to your domain
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${reem.className}`}>
        <body className="overflow-x-hidden!" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </body>
    </html>
  );
}
