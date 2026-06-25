import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { MobileDashboardSidebar } from "@/app/dashboard/ui/mobile-dashboard-sidebar";
import { DashboardNavGroups } from "@/app/ui/dashboard/nav-groups";
import { requireAdminUser } from "@/lib/auth";

function getDisplayName(user: Awaited<ReturnType<typeof requireAdminUser>>) {
  return (
    user.fullName ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    "Administrador"
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();
  const displayName = getDisplayName(user);
  const email = user.primaryEmailAddress?.emailAddress;

  return (
    <div className="min-h-screen overflow-x-clip bg-secondary text-gray-950">
      <aside className="hidden border-b border-primary/10 bg-white xl:fixed xl:inset-y-0 xl:left-0 xl:z-30 xl:flex xl:w-72 xl:flex-col xl:border-b-0 xl:border-r">
        <div className="flex w-full flex-col gap-4 p-4 md:p-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              CL
            </div>
            <div>
              <p className="text-base font-semibold text-primary">
                CompuLibre
              </p>
              <p className="text-xs font-medium text-gray-500">
                Control Plane
              </p>
            </div>
          </Link>

          <DashboardNavGroups />
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-x-clip xl:ml-72">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-primary/10 bg-white px-4 py-3 md:px-8 xl:justify-end">
          <MobileDashboardSidebar />

          <div className="flex min-w-0 items-center justify-end gap-3">
            <div className="min-w-0 text-right">
              <p className="truncate text-sm font-semibold text-gray-900">
                {displayName}
              </p>
              {email ? (
                <p className="truncate text-xs text-gray-500">{email}</p>
              ) : null}
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>
        </header>

        <main className="overflow-x-clip p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
