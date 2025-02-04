"use client";

import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/stores/SidebarStore";
import {
  Boxes,
  Cctv,
  House,
  LogOut,
  NotepadText,
  Package,
  PackageOpen,
  Tag,
  Users,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const userLink = [
  {
    name: "Dashboard",
    url: "/",
    Icon: House,
  },
  {
    name: "Requests",
    url: "/requests",
    Icon: NotepadText,
  },
  {
    name: "Users",
    url: "/users",
    Icon: Users,
  },
  {
    name: "Entries",
    url: "/entries",
    Icon: Package,
  },
  {
    name: "Consumes",
    url: "/consumes",
    Icon: PackageOpen,
  },
  {
    name: "Brands",
    url: "/brands",
    Icon: Tag,
  },
  {
    name: "Products",
    url: "/products",
    Icon: Cctv,
  },
  {
    name: "Items",
    url: "/items",
    Icon: Boxes,
  },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  const pathname = usePathname();

  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
    toast.success("Behasil Log Out!");
  }

  return (
    <>
      <aside
        className={cn(
          "box-shadow fixed z-50 min-h-screen w-[280px] space-y-4 overflow-hidden bg-tertiary px-4 py-7 shadow-sm transition-all duration-500",
          isSidebarOpen ? "translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        <div className="flex w-full items-center gap-4 px-5">
          <Link href={"/"} className="relative flex size-24 items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="object-contain object-center"
              fill
            />
          </Link>
          <Link href={"/"}>
            <p className="text-xl font-bold text-primary lg:text-2xl">
              Inventory
            </p>

            <p className="text-lg text-primary lg:text-xl">Management</p>
          </Link>

          <X
            onClick={closeSidebar}
            className="text-primary lg:hidden"
            size={32}
            strokeWidth={1.8}
          />
        </div>

        <Separator />

        <ScrollArea className="h-[85vh] text-slate-100">
          <Accordion type="single" className="flex flex-col gap-2" collapsible>
            {userLink.map((item) => (
              <div key={item.url}>
                <Link
                  onClick={closeSidebar}
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "mt-1 flex w-full items-center justify-between rounded-lg px-5 py-2.5 text-primary duration-300",
                    pathname === item.url
                      ? "bg-primary text-tertiary shadow-sm"
                      : "hover:bg-primary/50 hover:text-tertiary",
                  )}
                >
                  <div className="flex items-center justify-center gap-5">
                    <item.Icon strokeWidth={1.8} size={24} />
                    <div className="text-xl">{item.name}</div>
                  </div>
                </Link>
              </div>
            ))}

            <div
              className={cn(
                "mt-1 flex h-full w-full cursor-pointer items-center px-5 py-2.5 text-primary duration-300",
              )}
            >
              <div
                onClick={handleLogout}
                className={`"justify-center flex cursor-pointer items-center gap-5`}
              >
                <LogOut strokeWidth={1.8} size={24} />
                <div className="text-xl">Log Out</div>
              </div>
            </div>
          </Accordion>
        </ScrollArea>
      </aside>
    </>
  );
}
