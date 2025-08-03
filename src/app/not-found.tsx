import ActionButtons from "@/components/extra/action-buttons";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { HelpCircleIcon, Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-32 right-32 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-30" />

        {/* Main content */}
        <div className="relative z-10 text-center space-y-6 animate-in fade-in-50 duration-1000">
          {/* Error indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-in slide-in-from-top-4 duration-700">
            <HelpCircleIcon className="w-4 h-4" />
            Page Not Found
          </div>

          {/* Main 404 text */}
          <div className="space-y-2">
            <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-purple-500 via-blue-600 to-cyan-400 bg-clip-text text-center text-8xl md:text-9xl font-black leading-none tracking-tighter text-transparent animate-in zoom-in-50 duration-1000 delay-200">
              404
            </span>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto animate-in slide-in-from-left-4 duration-700 delay-500" />
          </div>

          {/* Description */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Oops! Lost in Space
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have drifted into the
              digital void. Let&apos;s get you back on track.
            </p>
          </div>

          {/* Action buttons */}
          <Suspense fallback={<Loader2Icon className="animate-spin" />}>
            <ActionButtons />
          </Suspense>
          {/* Fun fact */}
          <div className="pt-8 animate-in fade-in duration-1000 delay-1000">
            <p className="text-xs text-muted-foreground/60 italic">
              Fun fact: HTTP 404 errors were named after room 404 at CERN where
              the web was born
            </p>
          </div>
        </div>

        <RetroGrid />
      </div>
    </main>
  );
}
