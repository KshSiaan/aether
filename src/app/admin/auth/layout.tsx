import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"; // or use request.url

  if (token) {
    const res = await fetch(`${baseUrl}/api/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const user = await res.json();
      console.log("User:", user);
    } else {
      console.error("Failed to fetch user:", res.status);
    }
  }

  return <>{children}</>;
}
