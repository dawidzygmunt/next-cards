import SideNavbar from "@/components/sideNavbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <>
      <div className="flex">
        <SideNavbar />
        <div className="m-16">{children}</div>
      </div>
    </>
  );
}
