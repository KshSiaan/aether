import { CheckCircle, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Settings() {
  return (
    <section className="h-dvh w-full grid grid-cols-5">
      <div className="w-full h-full border-r">
        <nav className="w-full h-full space-y-6">
          <div className="border-b py-4 px-4">
            <Button variant={"outline"}>
              <ChevronLeft />
              Go back
            </Button>
          </div>
          <Button className="w-full" variant={"link"}>
            General
          </Button>
          <Button className="w-full" variant={"link"}>
            More
          </Button>
        </nav>
      </div>
      <div className="col-span-4 p-6">
        <h2 className="text-lg font-bold">General Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your preferences and application behavior
        </p>
        <div className="mt-12 border-t pt-4">
          <span>Choose your theme:</span>
          <div className="w-full grid grid-cols-3 gap-6 mt-4">
            {/* <div className="w-full aspect-square flex justify-center items-center">
              Theme:
            </div> */}
            <Card className="w-full aspect-square rounded-lg border flex flex-col">
              <CardHeader className="w-full">
                <CardTitle className="text-sm">&gt; _ Light Theme</CardTitle>
              </CardHeader>
              <CardContent className="w-full flex-1"></CardContent>
              <CardFooter className="w-full">
                <Button>
                  <CheckCircle /> Select
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full aspect-square rounded-lg border">
              <CardHeader>
                <CardTitle className="text-sm">&gt; _ Dark Theme</CardTitle>
              </CardHeader>
            </Card>
            <Card className="w-full aspect-square rounded-lg border">
              <CardHeader>
                <CardTitle className="text-sm">&gt; _ System Default</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
