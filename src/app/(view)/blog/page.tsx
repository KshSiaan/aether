import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="p-6">
      <div className="mt-6">
        <h1 className="text-4xl text-center font-bold">Most Recent Blogs</h1>
      </div>
      <section className="p-6 bg-secondary rounded-lg mt-6 grid  lg:grid-cols-4 gap-6">
        {Array(10)
          .fill("")
          .map((_, i) => (
            <Link href={`blog/${i}`} key={i}>
              <div
                className="w-full relative aspect-video bg-background rounded-lg bg-cover bg-center group cursor-pointer hover:scale-105 transition-all"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1662482202762-9f11e4c1fe68?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
              >
                <div className="absolute h-full w-full hover:bg-foreground/20 top-0 left-0 rounded-lg transition-all hover:backdrop-blur-xs rounded-b-lg">
                  <div className="absolute bottom-0 left-0 w-full bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                    <h4 className="line-clamp-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h4>
                    <p className="mt-2 text-xs line-cla">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Ex facere accusantium tempore asperiores, labore accusamus
                      iste veritatis quo a assumenda non id itaque deserunt.
                      Vitae molestiae officiis suscipit esse perspiciatis.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </main>
  );
}
