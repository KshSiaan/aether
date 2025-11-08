import { base_api } from "@/lib/config";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    console.log(`${base_api}/me`);

    const res = await fetch(`${base_api}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const user = await res.json();

    if (res.ok) {
      if (user.role === "admin") {
        return redirect("/admin/dashboard");
      } else if (user.role === "user") {
        return notFound();
      }
    }
  }

  return children;
}
