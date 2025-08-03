import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { ReactLenis } from "@/lib/lenis";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <ReactLenis root>{children}</ReactLenis>
        <Footer />
      </div>
    </>
  );
}
