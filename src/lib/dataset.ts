interface Dataset {
  id: string | number;
  title: string;
  description: string;
  internal: boolean;
  link: string | undefined;
  tags: string[];
  date: string;
  author: string;
}
export const dataSet: Dataset[] = [
  {
    id: 0,
    title: "Summarizer",
    description:
      "AI-powered tool that condenses long text into clear, concise summaries without losing meaning.",
    tags: ["AI", "Web", "TypeScript"],
    date: "2025-09-14",
    author: "Siaan",
    internal: false,
    link: "",
  },
];
