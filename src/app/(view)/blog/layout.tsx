import BlogNaver from "./blog-naver";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-20">
      <BlogNaver />
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
