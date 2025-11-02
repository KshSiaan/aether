import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeedbackForm from "../feedback/feedback-form";
export default function Page() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Card className="w-1/2! mt-12">
        <CardHeader className="border-b">
          <CardTitle>Post a feedback to admin</CardTitle>
        </CardHeader>
        <CardContent className="p-6! w-full">
          <div className="bg-background p-6">
            <FeedbackForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
