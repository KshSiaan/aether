import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Page() {
  return (
    <main className="pt-48 pb-24 px-[7%]">
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
      <article id="#code" className="text-muted-foreground">
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
      <article id="#posts" className="text-muted-foreground">
        <h3 className="w-full text-2xl">Post management</h3>
        <br />
        <div className="flex gap-6 items-center justify-start">
          <p>Requirement: </p>
          <div className=" space-x-2">
            <Badge variant={"outline"}>Must be logged in</Badge>
            <Badge variant={"outline"}>Have a valid text title</Badge>
            <Badge variant={"outline"}>Have a valid text content</Badge>
          </div>
        </div>
        <br />
        <p>
          Posts are another feature of aether. you can tell people about what
          you're up to. you can encourage people, help poeple. Share about your
          code block. you can share your innovation and ideas through it. but
          remember, posts are limited text contents. you cant not write a post
          as effeciently as you can write a blog. why? blogs are more dynamic
          and more content holder. we could have the same functionality in
          posts. but posts are like posts. share ideas. go boom!! kaboom!!
        </p>
        <br />
        <br />
        <h4 className="text-xl">
          <b>How to create a post?</b>
        </h4>
        <br />
        <ul className="list-disc list-inside">
          <li>
            Go to{" "}
            <Link href={"/profile"} className="text-foreground hover:underline">
              "My profile"
            </Link>{" "}
            from the top corner of your screen
          </li>
        </ul>
      </article>
    </main>
  );
}

// <Link
//   className="text-primary font-bold"
//   href={"https://ravenorigin.vercel.app"}
// >
//   Raven
// </Link>
