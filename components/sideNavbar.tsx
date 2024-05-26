"use client";

import {
  AlignHorizontalJustifyEnd,
  BookDashed,
  ClipboardSignature,
  LibraryBig,
  LogOut,
  Mail,
  Settings,
  SignalMedium,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MainNav } from "./main-nav";
import { UserProfile } from "@clerk/nextjs";

function SideNavbar() {
  const router = useRouter();

  return (
    <aside className="w-[220px] flex flex-col">
      <div
        className="flex m-4 hover:cursor-pointer justify- items-center"
        onClick={() => router.push("/")}
      >
        <h2 className="font-bold text-2xl">
          Karty
          <span className="text-red-500">Party</span>
        </h2>
      </div>
      <div className="flex flex-col bg-white mx-5 rounded-xl font-bold relative h-[88vh] shadow-2xl">
        <MainNav />
      </div>
      {/* <UserProfile /> */}
    </aside>
  );
}

export default SideNavbar;
