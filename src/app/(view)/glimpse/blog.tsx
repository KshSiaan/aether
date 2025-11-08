import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import Link from "next/link";
import React from "react";

export default function BlogManagement() {
  return (
    <article id="posts" className="text-muted-foreground">
      <h3 className="w-full text-2xl">Blog management</h3>
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
        Blogs however are extended posts in general. but their purpose is to
        share and preview a specific content or topic. i hope you do know what
        blogs are. with blogs, you can share a very specific idea in detail with
        more flexibility over the content body. engage with your writing and you
        or another can bookmark a blog which can come in help in need. blogs are
        powerful and can become an important part of this platform. i know you
        understand why.
      </p>
      <br />
      <br />
      <h4 className="text-xl">
        <b>How to create a blog?</b>
      </h4>
      <br />
      <ul className="list-disc list-inside">
        <li>
          Go to{" "}
          <Link href={"/profile"} className="text-foreground hover:underline">
            "Blogs"
          </Link>{" "}
          from the top navbar of your screen
        </li>
        <li>
          After you clicked "Blogs", the page will appear where you will see
          "Most recent blogs" and many more... Blogs has its own navigation bar.
          its right below the top navbar where there are buttons/links saying
          "Recent Blogs", "Saved Blogs", "Write a Blogs"
        </li>
        <li>
          "Recent Blogs" is the default landing page of blogs where every latest
          blog is shown.
        </li>
        <li>
          "Saved Blogs" is the the page of blogs where every saved blog by you
          is shown.
        </li>
        <li>
          Since you want to create a new blog, click on{" "}
          <Link className="text-foreground" href={"/profile/posts/create"}>
            "Write a blog"
          </Link>{" "}
          .
        </li>
        <li>
          Now you have a blog creation Interface where there is a
          <ul className="pl-12 list-disc list-inside">
            <li>Blog title input box</li>
            <li>Blog body editor field to write and modify your content</li>
            <li>
              "Confirm & Post" submit button to confirm and upload the post on{" "}
              <Link href={"/blog"} className="text-foreground">
                blogs
              </Link>
              .
            </li>
          </ul>
        </li>
        <li>
          After you write a blog and post it. it should be listed in the latest
          blogs section.
        </li>
      </ul>

      <br />
      <h4 className="text-2xl pb-6">Features:</h4>
      <ul className="list-disc list-inside">
        <li>
          Actions:
          <ul className="pl-12 list-disc list-inside">
            <li>
              <span className="text-foreground">Undo & Redo:</span> your post
              content is usually edited multiple times, so these let you easily
              revert or restore previous changes without losing progress.
            </li>
            <li>
              <span className="text-foreground">Text alignment:</span> adjust
              how your text appears — left, center, or right — to control the
              overall layout and readability of your post.
            </li>
            <li>
              <span className="text-foreground">
                Indentation Functionalities:
              </span>{" "}
              organize your content structure by adding or removing indents,
              helping you format lists, quotes, or code blocks neatly.
            </li>
            <li>
              <span className="text-foreground">
                Bold, Italic, Underline & Strike:
              </span>{" "}
              Edit your texts as you want using these.
            </li>
            <li>
              <span className="text-foreground">Text formatters:</span> There
              are several text formatters such as heading, paragraph, blockquote
              and lists.
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <ul className="list-disc list-inside">
        <li>
          Extended functions:
          <ul className="pl-12 list-disc list-inside">
            <li>
              <span className="text-foreground">Lock & Unlock:</span> secure
              your post to prevent accidental edits, and unlock it when you're
              ready to make further changes.
            </li>
            <li>
              <span className="text-foreground">Character & Word counter:</span>{" "}
              track the length of your post in real time to maintain clarity,
              consistency, and meet content limits if required.
            </li>
            <li>
              <span className="text-foreground">Speech to text converter:</span>{" "}
              transcribe your spoken words into written text, making it faster
              and easier to create posts without typing.{" "}
              <em className="text-amber-400">
                Note: this feature may or may not be available on your browser.
              </em>
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <ul className="list-disc list-inside">
        <li>
          Editor functionalities:
          <ul className="pl-12 list-disc list-inside">
            <li>
              <span className="text-foreground">Emoji picker:</span> type{" "}
              <Kbd>:</Kbd> to quickly open the emoji dropdown, then search and
              select your favorite emoji to add it instantly to your post.
            </li>
          </ul>
        </li>
      </ul>
    </article>
  );
}
