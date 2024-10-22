import { User as PrismaUser } from "@prisma/client"
import React from "react"

interface SingleUserProps {
  user: PrismaUser
}

const SingleUser: React.FC<SingleUserProps> = ({ user }) => {
  const firstLetter = user.name.charAt(0).toUpperCase()
  return (
    <div
      className="border px-5 py-5 min-w-[250px] flex gap-4 items-center transition-all rounded-sm 
        hover:border-[#474747] hover:shadow-md duration-300 hover:cursor-default
      "
    >
      <div className="rounded-full bg-[#302030] w-[40px] h-[40px] text-white flex items-center justify-center">
        <p>{firstLetter}</p>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2 items-center relative">
          <span>{user.email}</span>
        </div>
        <p className="">
          {" "}
          role:
          <span className="font-bold">{user.role}</span>
        </p>
      </div>
    </div>
  )
}

export default SingleUser
