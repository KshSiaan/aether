"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { createBlockApi, getCategoriesApi } from "@/lib/api/node";
import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FileTextIcon, Loader2Icon, PointerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Finalizer() {
  const navig = useRouter();
  const [codeSet, setCodeSet] = useState<
    { title: string; language: string; code: idk; node: number } | undefined
  >();
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["cats", codeSet?.node],
    queryFn: () => getCategoriesApi({ node: codeSet!.node }),
    enabled: !!codeSet?.node,
  });
  const { mutate } = useMutation({
    mutationKey: ["create_block"],
    mutationFn: (data: {
      title: string;
      language: string;
      code: string;
      node: number;
      categories: Array<number>;
    }) => {
      return createBlockApi({ data, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });
  useEffect(() => {
    const codeset = localStorage.getItem("codeset");
    if (codeset) {
      setCodeSet(JSON.parse(codeset));
      console.log(JSON.parse(codeset));
    }
  }, []);

  function submitter() {
    const dataset = { ...codeSet, categories: selectedCats };
    mutate(dataset as idk);
  }

  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return (
    <Card className="w-full lg:w-1/2 bg-background rounded-none">
      <CardHeader className="border-b">
        <CardTitle>Do you want to save it?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="border p-4 hover:bg-secondary/30 flex justify-between items-center">
              <div className="flex text-sm font-semibold items-center gap-2">
                <FileTextIcon className="size-4" /> {codeSet?.title}
              </div>
              <PointerIcon className="size-5 text-muted-foreground" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-full">
            <div className="w-full">
              <pre className="whitespace-pre-wrap bg-muted text-sm rounded-lg p-4 font-mono overflow-x-auto">
                <code>
                  {codeSet?.code?.split("\n")?.slice(0, 5)?.join("\n")}
                  {codeSet?.code?.split("\n")?.length > 5 && "\n..."}
                </code>
              </pre>
            </div>
          </HoverCardContent>
        </HoverCard>
        <p className="text-muted-foreground ">
          type: &nbsp; <Badge className="capitalize">{codeSet?.language}</Badge>
        </p>
        <Separator />
        <div className="">
          <h4>Select categories of your code</h4>
          <div className="w-full grid grid-cols-2 gap-6 lg:grid-cols-6 mt-6">
            {data?.data?.map((x) => (
              <div className="flex items-center gap-2" key={x.id}>
                <Checkbox
                  id={`cat-${x.id}`}
                  checked={selectedCats.includes(x.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCats((prev) => [...prev, x.id]);
                    } else {
                      setSelectedCats((prev) =>
                        prev.filter((id) => id !== x.id)
                      );
                    }
                  }}
                />
                <Label htmlFor={`cat-${x.id}`}>{x.name}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2">
          <Switch /> Public
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-4">
        <Button
          variant={"ghost"}
          onClick={() => {
            navig.back();
          }}
        >
          Go back
        </Button>
        <Button
          onClick={() => {
            submitter();
          }}
        >
          Confirm & Save
        </Button>
      </CardFooter>
    </Card>
  );
}
