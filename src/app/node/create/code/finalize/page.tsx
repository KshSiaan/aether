import { Suspense } from "react";
import Finalizer from "./finalizer";
import { Loader2Icon } from "lucide-react";
import { cookies } from "next/headers";
import AuthWarn from "./auth-warn";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  return (
    <main className="h-dvh w-full flex justify-center items-center p-6">
      {token ? (
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <Finalizer />
        </Suspense>
      ) : (
        <Suspense>
          <AuthWarn />
        </Suspense>
      )}
    </main>
  );
}
