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
import { idk } from "@/lib/utils";
import DOMPurify from "dompurify";
export default function PostBlock({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    body: string;
    created_at: string;
    user: {
      name: string;
      role: string;
      alias: string;
      email: string;
      gender: idk;
      connects: idk;
      original: boolean;
      avatar_url: string;
      prefer_alias: boolean;
    };
  };
}) {
  return (
    <Card className="w-full relative bg-background rounded-lg bg-cover bg-center">
      <CardHeader className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={data.user.avatar_url ?? "/avatar/default.png"} />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <p className="text-sm">
          {data.user.prefer_alias ? data.user.alias : data.user.name}
        </p>
      </CardHeader>
      <CardContent>
        <CardDescription
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.body),
          }}
        />
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
