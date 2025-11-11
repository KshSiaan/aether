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
    link: "https://snipit-iota.vercel.app/",
  },
];


export const LANGUAGES = [
  { value: "javascript", label: "JavaScript", ext: ".js" },
  { value: "typescript", label: "TypeScript", ext: ".ts" },
  { value: "python", label: "Python", ext: ".py" },
  { value: "cpp", label: "C++", ext: ".cpp" },
  { value: "csharp", label: "C#", ext: ".cs" },
  { value: "java", label: "Java", ext: ".java" },
  { value: "rust", label: "Rust", ext: ".rs" },
  { value: "go", label: "Go", ext: ".go" },
  { value: "html", label: "HTML", ext: ".html" },
  { value: "css", label: "CSS", ext: ".css" },
  { value: "json", label: "JSON", ext: ".json" },
  { value: "sql", label: "SQL", ext: ".sql" },
  { value: "php", label: "PHP", ext: ".php" },
  { value: "swift", label: "Swift", ext: ".swift" },
  { value: "kotlin", label: "Kotlin", ext: ".kt" },
  { value: "ruby", label: "Ruby", ext: ".rb" },
  { value: "bash", label: "Bash", ext: ".sh" },
];