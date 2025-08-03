import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  BookHeartIcon,
  KeyIcon,
  LayoutDashboardIcon,
  OrigamiIcon,
} from "lucide-react";

const cards = [
  {
    name: "Features",
    className: "col-span-2",
    Icon: LayoutDashboardIcon,
    description: "Tools built for minds that build differently.",
    href: "/",
    cta: "Try now",
  },
  {
    name: "Origin of Aether",
    className: "col-span-4",
    Icon: OrigamiIcon,
    description: "Where ideas take form and function.",
    href: "/",
    cta: "Learn more",
  },
  {
    name: "Read our Blogs",
    className: "col-span-4",
    Icon: BookHeartIcon,
    description: "Thoughts from builders, for builders.",
    href: "/",
    cta: "Read blogs",
  },
  {
    name: "Join Aether now",
    className: "col-span-2",
    Icon: KeyIcon,
    description: "Not a platform. A creator’s realm.",
    href: "/",
    cta: "Join in",
  },
];

export default function BentoSection() {
  return (
    <BentoGrid className="mt-12 grid-cols-6">
      {cards.map((card, index) => (
        <BentoCard
          key={index}
          name={card.name}
          className={card.className}
          background
          Icon={card.Icon}
          description={card.description}
          href={card.href}
          cta={card.cta}
        />
      ))}
    </BentoGrid>
  );
}
