import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { ReactLenis } from "@/lib/lenis";
import { cookies } from "next/headers";
import NotFound from "../not-found";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token");
  if (!token) {
    return NotFound();
  }
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
