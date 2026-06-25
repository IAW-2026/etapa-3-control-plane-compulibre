"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardNavGroups } from "@/app/ui/dashboard/nav-groups";

export function MobileDashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/15 bg-white text-primary transition hover:bg-accent/35"
        aria-label="Abrir navegación"
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            className="absolute inset-0 bg-gray-950/45"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar navegación"
          />

          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col border-r border-primary/10 bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between gap-3">
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

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/15 text-primary transition hover:bg-accent/35"
                aria-label="Cerrar navegación"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6">
              <DashboardNavGroups />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
