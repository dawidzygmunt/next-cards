import prisma from "@/lib/prisma"
import SingleUser from "./components/single-user"
import { User as PrismaUser } from "@prisma/client"

const Users = async () => {
  const users: PrismaUser[] = await prisma.user.findMany()

  return (
    <div className="flex flex-col">
      <div className="flex">
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users
