import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { ReactLenis } from "@/lib/lenis";
import { cookies } from "next/headers";
import NotFound from "../not-found";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
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
        <ReactLenis root>
          <Suspense
            fallback={
              <div className={`flex justify-center items-center h-24 mx-auto`}>
                <Loader2Icon className={`animate-spin`} />
              </div>
            }
          >
            {children}
          </Suspense>
        </ReactLenis>
        <Footer />
      </div>
    </>
  );
}
