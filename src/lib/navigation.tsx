import {
  BookIcon,
  HomeIcon,
  MegaphoneIcon,
  SpeakerIcon,
  UsersIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  src: string;
  childs?: Array<{
    label: string;
    href: string;
  }>;
}

export const navItems: NavItem[] = [
  {
    id: "1",
    label: "Home",
    href: "/admin/dashboard",
    src: "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
    icon: <HomeIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
  },
  {
    id: "2",
    label: "Users",
    href: "/admin/user",
    src: "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
    icon: (
      <UsersIcon className="h-8 w-8 fill-black stroke-black rounded-full" />
    ),
  },
  {
    id: "3",
    label: "Blogs",
    href: "/admin/blogs",
    src: "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
    icon: <BookIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
  },
  {
    id: "4",
    label: "Posts",
    href: "/admin/posts",
    src: "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
    icon: (
      <MegaphoneIcon className="h-8 w-8 fill-black stroke-black rounded-full" />
    ),
  },
];
