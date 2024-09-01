import { SignIn } from "@clerk/nextjs"
import { AlertOctagon, MoveDownRight } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 items-center">
      <div className="border-2 border-red-500 flex flex-col px-8 py-4 rounded-lg m-5 relative">
        <MoveDownRight className="text-red-700 absolute left-0 top-0 -translate-x-8 -translate-y-8 w-8 h-8" />

        <span>
          Login: <b>admin@test.com</b>
        </span>
        <span>
          Password: <b>123</b>
        </span>
      </div>
      <SignIn path="/cards/sign-in" />
    </div>
  )
}
