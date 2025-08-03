import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import React from "react";
import ClientView from "./client-view";
import BentoSection from "./bento-section";
import Analytics from "./analytics";

export default function Home() {
  return (
    <>
      <header className="h-dvh w-dvw p-4 pt-20 overflow-visible">
        <section className="overflow-visible h-full w-full bg-gradient-to-br from-[#FB04FF] via-[#6C8FE9] to-[#FFFFFF] rounded-xl p-6 relative flex justify-center items-center flex-col">
          <h1 className="text-7xl text-center font-black text-foreground/80">
            Connect with each of us <br />
            With your own touch
          </h1>
          <div className="flex justify-center items-center mt-12">
            <Button
              className="rounded-full text-xl h-auto py-4 px-12"
              variant={"secondary"}
              size={"lg"}
            >
              <AnimatedShinyText>Open Aether</AnimatedShinyText>
            </Button>
          </div>
          <div className="h-[300px]"></div>
          <ClientView />
        </section>
      </header>
      <main className="pt-[364px] pb-[40dvh] px-[7%]">
        <h2 className="text-4xl text-center font-semibold">
          What is Aether anyway?
        </h2>
        <BentoSection />
        <div className="mt-[20dvh]">
          <h2 className="text-4xl text-center font-semibold">
            Aether currently has
          </h2>
          <div className="mt-24">
            <Analytics />
          </div>
        </div>
        <div className="mt-[20dvh]">
          <h2 className="text-4xl text-center font-semibold">Developer Note</h2>
          <article className="mt-24">[My notes goes in here]...</article>
        </div>
      </main>
    </>
  );
}
