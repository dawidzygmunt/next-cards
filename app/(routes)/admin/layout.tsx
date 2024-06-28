import NotAuthorized from "@/components/not-authorized";
import SideNavbar from "@/components/sideNavbar";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await currentUser();
  console.log(user?.publicMetadata);
  if (user?.id && user.publicMetadata?.role === "admin") {
    return (
      <div className="flex">
        <SideNavbar />
        <div className="m-16 w-full min-h-screen">{children}</div>
      </div>
    );
  }

  return <NotAuthorized />;
}
