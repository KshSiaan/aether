import React, { Suspense } from "react";
import Feedbacks from "./feedbacks";

export default function Page() {
  return (
    <main className="flex-1 max-h-[70dvh] w-full overflow-y-auto">
      <div className="p-6 w-full space-y-6">
        <Suspense>
          <Feedbacks />
        </Suspense>
      </div>
    </main>
  );
}
