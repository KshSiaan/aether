"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft, LogIn } from "lucide-react";

export default function AuthWarn() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg border border-border rounded-none bg-background">
        <CardHeader className="border-b space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="secondary" className="ml-auto">
              Authentication Required
            </Badge>
          </div>
          <div>
            <CardTitle className="text-2xl">Your Code Needs a Home</CardTitle>
            <CardDescription className="text-sm mt-1">
              Keep your creations safe and synced
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 py-6">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Secure Storage
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your code is safe in your browser, but logging in ensures it's
                  backed up
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Access Anywhere
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Log in to access your creations from any device
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Stay Connected
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sync your progress and never lose your work
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t pt-4">
          <Button asChild size="lg" className="w-full gap-2">
            <Link href="/login">
              <LogIn className="w-4 h-4" />
              Log in
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="w-full gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
