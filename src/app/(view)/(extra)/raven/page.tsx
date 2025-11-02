import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

import Detail from "./detail";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 space-y-6">
            <div className="inline-block">
              <div className="text-sm font-medium tracking-wider text-primary uppercase">
                Author & Developer
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              The one who watches
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
              Exploring perspectives through the lens of philosophy and code. A
              full-stack developer inspired by millions, building for billions.
            </p>
          </div>

          <div className="mb-20 rounded-2xl overflow-hidden border border-foreground/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-video w-full bg-primary/5">
              <Image
                fill
                src={"/raven.png"}
                alt="The Author - Raven"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-20 bg-primary/5 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🪶</span> Philosophy
            </h2>
            <div className="space-y-3">
              <p className="text-lg font-medium text-foreground">
                "What's normal for the spider is chaos for the fly"
              </p>
              <p className="text-base text-foreground/75 leading-relaxed max-w-3xl">
                There's profound wisdom in this perspective. It reminds us that
                reality is subjective—what seems ordinary to one being might be
                incomprehensible to another. We must look beyond our immediate
                frame of reference to understand the broader picture: the world,
                the universe, and everything beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-12">About</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-primary/5 border border-foreground/10 rounded-xl p-8 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-bold mb-3 text-primary">
                  Development
                </h3>
                <p className="text-base text-foreground/75 leading-relaxed">
                  Full-stack developer inspired by millions of developers.
                  Building solutions for billions of users. Focused on creating
                  elegant, performant, and scalable applications that solve real
                  problems.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 border border-foreground/10 rounded-xl p-8 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-bold mb-3 text-primary">Vision</h3>
                <p className="text-base text-foreground/75 leading-relaxed">
                  Bridging the gap between philosophical thinking and practical
                  engineering. Building technology that not only works but makes
                  sense. Pursuing excellence in both craft and consciousness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-20 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Want to get in touch?</h2>
            <p className="text-lg text-foreground/70">
              Check out the portfolio and journey deeper into the work.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant={"outline"}
              className="rounded-full"
              asChild
            >
              <Link href={"https://ravenorigin.vercel.app"}>
                <AnimatedShinyText>Check Raven's Portfolio</AnimatedShinyText>
              </Link>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant={"outline"} className="rounded-full">
                  Really get in touch
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Raven’s Contact Information Dataset</DialogTitle>
                </DialogHeader>
                <Suspense
                  fallback={
                    <div
                      className={`flex justify-center items-center h-24 mx-auto`}
                    >
                      <Loader2Icon className={`animate-spin`} />
                    </div>
                  }
                >
                  <Detail />
                </Suspense>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </main>
  );
}
