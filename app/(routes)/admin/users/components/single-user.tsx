import { User as PrismaUser } from "@prisma/client"
import React from "react"

interface SingleUserProps {
  user: PrismaUser
}

const SingleUser: React.FC<SingleUserProps> = ({ user }) => {
  const firstLetter = user.name.charAt(0).toUpperCase()
  return (
    <div className="border px-5 py-3 min-w-[300px] flex flex-col">
      <div className="flex gap-2 items-center relative">
        <div className="rounded-full bg-[#302030] w-[40px] h-[40px] text-white flex items-center justify-center">
          <p>{firstLetter}</p>
        </div>
        <h1>{user.email}</h1>
      </div>
      <p className="text-center">
        {" "}
        role:
        <span className="font-bold">{user.role}</span>
      </p>
    </div>
  )
}

export default SingleUser
