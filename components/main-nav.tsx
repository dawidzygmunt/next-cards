"use cleint"
import { cn } from "@/lib/utils"
import {
  BookDashedIcon,
  CalendarDays,
  Icon,
  LayoutDashboard,
  LibraryBig,
  Mail,
  Plus,
  Settings,
  SignalMedium,
  Ticket,
  User,
} from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname()
  const params = useParams()
  const routes = [
    {
      href: `/dashboard`,
      label: "Dashboard",
      active: pathName === `/admin/dashboard`,
      icon: <LayoutDashboard />,
    },
    {
      href: `/users`,
      label: "Users",
      active: pathName === `/admin/users`,
      icon: <User />,
    },
    {
      href: `/statistics`,
      label: "Statistics",
      active: pathName === `/admin/statistics`,
      icon: <SignalMedium />,
    },
    {
      href: `/editions`,
      label: "Editions",
      active: pathName === `/admin/editions`,
      icon: <BookDashedIcon />,
    },
    {
      href: `/all-cards`,
      label: "All Cards",
      active: pathName === `/admin/all-cards`,
      icon: <LibraryBig />,
    },
    {
      href: `/new-card`,
      label: "New card",
      active: pathName === `/admin/new-card`,
      icon: <Plus />,
    },
    {
      href: `/messages`,
      label: "Messages",
      active: pathName === `/admin/messages`,
      icon: <Mail />,
    },
    {
      href: `/tickets`,
      label: "Tickets",
      active: pathName === `/admin/tickets`,
      icon: <Ticket />,
    },
    {
      href: `/settings`,
      label: "Settings",
      active: pathName === `/admin/settings`,
      icon: <Settings />,
    },
  ]
  return (
    <nav>
      {routes.map((route) => (
        <Link
          href={`/admin/${route.href}`}
          key={route.href}
          className={cn(
            `flex items-center align-middle p-4 text-black hover:translate-x-1 ease-in-out group 
            ${route.active ? "text-blue-900 translate-x-1" : ""}`
          )}
        >
          <span
            className={cn(
              `group-hover:translate-x-2 duration-300 ease-in-out flex gap-2 ${
                route.active ? "translate-x-2" : ""
              }`
            )}
          >
            {route.icon}
            {route.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}
