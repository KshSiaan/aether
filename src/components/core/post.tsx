import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HeartIcon, MessageCircleQuestionIcon } from "lucide-react";
import { Share1Icon } from "@radix-ui/react-icons";

export default function PostBlock() {
  return (
    <Card
      className="w-full relative bg-background rounded-lg bg-cover bg-center"
      // key={x.id}
    >
      <CardHeader className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={"/avatar/default.png"} />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <p className="text-sm">
          {/* {x.user.prefer_alias ? x.user.alias : x.user.name} */}
          User name
        </p>
      </CardHeader>
      <CardContent>
        <CardDescription
          className="mt-2 text-sm"
          // dangerouslySetInnerHTML={{
          //   __html: DOMPurify.sanitize(x.body),
          // }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
          quidem, exercitationem maiores fuga sed libero inventore deserunt
          aliquam quam nihil animi, sit ea veniam reiciendis illo soluta
          explicabo sapiente impedit?
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t flex justify-between items-center">
        <div className="">
          {/* <Button variant={"outline"} asChild>
                    <Link href={`/blog/${x.id}`}>Read this blog</Link>
                  </Button> */}
          <Button variant={"ghost"} size={"icon"}>
            <HeartIcon />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <MessageCircleQuestionIcon />
          </Button>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            // onClick={() => {
            //   if (navigator.share) {
            //     navigator
            //       .share({
            //         title: x.title,
            //         text: "Check out this blog!",
            //         url: `${window.location.origin}/blog/${x.id}`,
            //       })
            //       .then(() => console.log("Shared successfully"))
            //       .catch((err) => console.error("Error sharing:", err));
            //   } else {
            //     alert(
            //       "Your browser does not support sharing this link."
            //     );
            //   }
            // }}
          >
            <Share1Icon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
