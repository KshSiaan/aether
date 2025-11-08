import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import Link from "next/link";
import React from "react";

export default function PostManagement() {
  return (
    <article id="posts" className="text-muted-foreground">
      <h3 className="w-full text-2xl">Post management</h3>
      <br />
      <div className="flex gap-6 items-center justify-start">
        <p>Requirement: </p>
        <div className=" space-x-2">
          <Badge variant={"outline"}>Must be logged in</Badge>
          <Badge variant={"outline"}>Have a valid text content</Badge>
        </div>
      </div>
      <br />
      <p>
        Posts are another feature of aether. you can tell people about what
        you're up to. you can encourage people, help poeple. Share about your
        code block. you can share your innovation and ideas through it. but
        remember, posts are limited text contents. you cant not write a post as
        effeciently as you can write a blog. why? blogs are more dynamic and
        more content holder. we could have the same functionality in posts. but
        posts are like posts. share ideas. go boom!! kaboom!!
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
        <li>
          There <span className="text-foreground">"My Post"</span> tab right
          under the profile card is supposed to be activated by default, if not,
          click on it. and it will show your posts, if you have any.
        </li>
        <li>
          Afrer the "My post" is active, there should a button with the label{" "}
          <Link className="text-foreground" href={"/profile/posts/create"}>
            "Create Post"
          </Link>{" "}
          on the right corner of the My Posts tab. Click it.
        </li>
        <li>
          Now you have a Post creation Interface where there is a
          <ul className="pl-12 list-disc list-inside">
            <li>Post body editor field to write and modify your content</li>
            <li>
              "Confirm & Post" submit button to confirm and upload the post on{" "}
              <Link href={"/app/feed"} className="text-foreground">
                feed
              </Link>
              .
            </li>
          </ul>
        </li>
        <li>
          After you write a post and post it. it should be listed in the feed
          section. and your profile as well.
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
