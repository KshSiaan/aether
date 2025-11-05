import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  BookHeartIcon,
  KeyIcon,
  LayoutDashboardIcon,
  OrigamiIcon,
} from "lucide-react";
import { DottedMap } from "@/components/ui/dotted-map";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { HackerBackground } from "@/components/ui/hacker-background";
import Image from "next/image";
import { Meteors } from "@/components/ui/meteors";
const cards = [
  {
    name: "Features",
    className: "lg:col-span-2",
    Icon: LayoutDashboardIcon,
    description: "Tools built for minds that build differently.",
    href: "/app/features",
    cta: "Try now",
    background: (
      <div className="absolute top-0 w-full h-full">
        <div className="relative h-fit w-full overflow-hidden ">
          <div className="to-background absolute inset-0 bg-radial from-transparent to-70%" />
          <DottedMap />
        </div>
      </div>
    ),
  },
  {
    name: "Origin of Aether",
    className: "lg:col-span-4",
    Icon: OrigamiIcon,
    description: "Where ideas take form and function.",
    href: "/origin",
    cta: "Learn more",
    background: (
      <div className="absolute top-10 flex w-full flex-col items-center justify-center overflow-hidden">
        <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] text-muted-foreground md:text-5xl md:leading-[5rem]">
          <ScrollVelocityRow baseVelocity={20} direction={1}>
            I am you You are all All is Aether &nbsp;^&nbsp;
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={20} direction={-1}>
            You exist between every thought that ever was
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    ),
  },
  {
    name: "Read our Blogs",
    className: "lg:col-span-4",
    Icon: BookHeartIcon,
    description: "Thoughts from builders, for builders.",
    href: "/blog",
    cta: "Read blogs",
    background: (
      <div className="bg-background absolute top-0 left-0 h-full w-full overflow-hidden">
        <HackerBackground fontSize={24} color="#ddd" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-background to-transparent"></div>
      </div>
    ),
  },
  {
    name: "Join Aether now",
    className: "lg:col-span-2",
    Icon: KeyIcon,
    description: "Not a platform. A creator’s realm.",
    href: "/login",
    cta: "Join in",
    background: (
      <div className="bg-background absolute top-0 left-0 h-full w-full overflow-hidden">
        <Meteors />
        <Image
          draggable="false"
          src={"/img/monteverde.webp"}
          fill
          alt="monteverde"
          className="object-cover object-top opacity-20"
        />
      </div>
    ),
  },
];

export default function BentoSection() {
  return (
    <BentoGrid className="mt-12 lg:grid-cols-6">
      {cards.map((card, index) => (
        <BentoCard
          key={index}
          name={card.name}
          className={card.className}
          background={card.background}
          Icon={card.Icon}
          description={card.description}
          href={card.href}
          cta={card.cta}
        />
      ))}
    </BentoGrid>
  );
}
