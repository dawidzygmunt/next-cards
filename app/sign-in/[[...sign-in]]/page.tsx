import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex w-full min-h-screen mt-24 justify-center">
      <SignIn />
    </div>
  );
}
