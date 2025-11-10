import CreateCategory from "./create-category";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import Categories from "./categories";

export default function Page() {
  return (
    <div className="flex-1 h-full w-full flex flex-col justify-between items-start">
      <div className="flex-1 w-full">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <Categories />
        </Suspense>
      </div>
      <Suspense>
        <CreateCategory />
      </Suspense>
    </div>
  );
}
