import { Suspense } from "react";
import Finalizer from "./finalizer";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <main className="h-dvh w-full flex justify-center items-center">
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Finalizer />
      </Suspense>
    </main>
  );
}
