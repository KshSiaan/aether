import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PostManagement from "./post";
import BlogManagement from "./blog";

export default function Page() {
  return (
    <main className="pt-48 pb-24 px-[7%] ">
      <h1 className="text-3xl lg:text-5xl border-b mb-24">
        Here's a quick guide on this platform
      </h1>
      <article className="text-muted-foreground ">
        <span className="text-4xl text-foreground">H</span>ello universe,{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="font-bold text-foreground cursor-help">Raven</span>
          </HoverCardTrigger>
          <HoverCardContent className="w-[300px] rounded-none">
            <div className="">Who's Raven?</div>
            <p className="text-muted-foreground text-xs">
              Well, he's the creator of Aehter.
            </p>
            <div className="flex justify-end items-end">
              <Button variant={"link"} asChild>
                <Link href={"/raven"}>Wanna know more?</Link>
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>{" "}
        writing.
        <br />
        <br />
        <div className="border-b pb-0.5">
          <strong className="text-foreground border px-2 text-xl">
            Introduction:
          </strong>
        </div>
        <br />
        <p>
          To define Aehter, i hope you're familiar with github. We can call
          aether as a cheap copy of github. BUT!! What do you do in Github?
          Store projects, collaborate.. and much more right?
        </p>
        <br />
        <p>
          Here you can store your code blocks. manage them and share them
          willingly. Even though thats the main purpose of this platform. in
          aether, you can also build a community. post, share, write blogs, save
          your favourite blogs. share your own written code blogs, give them
          meaning, purpose and vision.
        </p>
        <div className="border-b pb-0.5 mb-6 mt-12">
          <strong className="text-foreground border px-2 text-xl">
            How it works?
          </strong>
        </div>
        <p>
          Lets divide this section into 5 parts according to the functionalities
        </p>
        <br />
        <div className="w-full grid grid-cols-6">
          <a
            href="#code"
            type="button"
            className="cursor-pointer w-full p-2 border flex justify-center items-center hover:bg-secondary transition-colors"
          >
            Code Blocks
          </a>
          <a
            href="#posts"
            type="button"
            className="cursor-pointer w-full p-2 border flex justify-center items-center  hover:bg-secondary transition-colors"
          >
            Posts
          </a>
          <a
            href="#"
            type="button"
            className="cursor-pointer w-full p-2 border flex justify-center items-center  hover:bg-secondary transition-colors"
          >
            Blogs
          </a>
          <a
            href="#"
            type="button"
            className="cursor-pointer w-full p-2 border flex justify-center items-center  hover:bg-secondary transition-colors"
          >
            Profile and settings
          </a>
          <a
            href="#"
            type="button"
            className="cursor-pointer w-full p-2 border flex justify-center items-center  hover:bg-secondary transition-colors"
          >
            Extras
          </a>
        </div>
      </article>
      <Separator className="my-12" />
      <article id="code" className="text-muted-foreground">
        <h3 className="w-full text-2xl">Code Block management</h3>
        <br />
        <div className="flex gap-6 items-center justify-start">
          <p>Requirement: </p>
          <div className=" space-x-2">
            <Badge variant={"outline"}>Must be logged in</Badge>
            <Badge variant={"outline"}>Have a valid code</Badge>
          </div>
        </div>
        <br />
        <p></p>
      </article>

      <Separator className="my-12" />
      <PostManagement />
      <Separator className="my-12" />
      <BlogManagement />
    </main>
  );
}
