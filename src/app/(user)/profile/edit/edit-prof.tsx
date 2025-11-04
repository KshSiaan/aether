"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQuery } from "@tanstack/react-query";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { meApi, updateMeApi } from "@/lib/api/auth";
import { toast } from "sonner";

// ✅ Zod Schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  alias: z.string().optional(),
  prefer_alias: z.boolean().default(false).optional(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  gender: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProf({
  data,
  isPending,
}: {
  data: idk;
  isPending: boolean;
}) {
  const [{ token }] = useCookies(["token"]);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      alias: "",
      prefer_alias: false,
      bio: "",
      gender: undefined,
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["update_me"],
    mutationFn: (body: ProfileFormValues) => {
      return updateMeApi(token, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully updated profile");
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    // console.log("Profile data:", data);
    mutate(data);
  };
  useEffect(() => {
    if (!isPending && data) {
      form.setValue("name", data?.name);
      form.setValue("alias", data?.alias);
      form.setValue("prefer_alias", data?.prefer_alias);
      form.setValue("bio", data?.bio);
      form.setValue("gender", data?.gender);
    }
  }, [isPending]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alias */}
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias:</FormLabel>
              <FormControl>
                <Input placeholder="Enter alias (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Prefer Alias */}
        <FormField
          control={form.control}
          name="prefer_alias"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center justify-end mt-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Prefer Alias</FormLabel>
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio:</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[300px] resize-none"
                  placeholder="Write about yourself..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-6">
              <FormLabel>Gender:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-3 gap-6 space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="alien" />
                    </FormControl>
                    <FormLabel className="font-normal">Alien</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="programmer" />
                    </FormControl>
                    <FormLabel className="font-normal">Programmer</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="others" />
                    </FormControl>
                    <FormLabel className="font-normal">Others</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
