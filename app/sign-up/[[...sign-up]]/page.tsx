import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center pb-20">
      <SignUp path="/cards/sign-up" forceRedirectUrl="/" />
    </div>
  )
}
