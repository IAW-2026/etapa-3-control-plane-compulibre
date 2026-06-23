"use client";

import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  CubeIcon,
  MapPinIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type NavGroup = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    name: "Seller",
    icon: BuildingStorefrontIcon,
    items: [
      { name: "Ventas", href: "/dashboard/ventas", icon: ShoppingCartIcon },
      { name: "Productos", href: "/dashboard/productos", icon: CubeIcon },
      { name: "Vendedores", href: "/dashboard/vendedores", icon: UserGroupIcon },
    ],
  },
  {
    name: "Buyer",
    icon: ShoppingBagIcon,
    items: [
      { name: "Compradores", href: "/dashboard/compradores", icon: UserGroupIcon },
      { name: "Compras", href: "/dashboard/compras", icon: ShoppingCartIcon },
    ],
  },
  {
    name: "Payments",
    icon: BanknotesIcon,
    items: [
      { name: "Retiros", href: "/dashboard/retiros", icon: BanknotesIcon },
      { name: "Tickets", href: "/dashboard/tickets", icon: TicketIcon },
    ],
  },
  {
    name: "Shipping",
    icon: MapPinIcon,
    items: [{ name: "Envios", href: "/dashboard/envios", icon: MapPinIcon }],
  },
];

function getIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DashboardNavItem({ href, name, icon: Icon }: NavItem) {
  const pathname = usePathname();
  const isActive = getIsActive(pathname, href);

  return (
    <Link
      href={href}
      className={[
        "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
        isActive
          ? "bg-primary text-white shadow-sm"
          : "text-gray-700 hover:bg-accent/40 hover:text-primary",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
          isActive ? "bg-white/15 text-white" : "bg-secondary text-primary",
        ].join(" ")}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="truncate">{name}</span>
    </Link>
  );
}

function DashboardNavGroup({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const hasActiveItem = group.items.some((item) =>
    getIsActive(pathname, item.href)
  );
  const [isOpen, setIsOpen] = useState(hasActiveItem);
  const Icon = group.icon;

  return (
    <div className="rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={[
          "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition",
          hasActiveItem
            ? "bg-primary text-white shadow-sm"
            : "text-primary hover:bg-accent/35",
        ].join(" ")}
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={[
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
              hasActiveItem
                ? "bg-white/15 text-white"
                : "bg-secondary text-primary",
            ].join(" ")}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate">{group.name}</span>
        </span>
        <ChevronDownIcon
          className={[
            "h-4 w-4 shrink-0 transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div className="mt-2 flex flex-col gap-1 pl-3">
          {group.items.map((item) => (
            <DashboardNavItem key={item.href} {...item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DashboardNavGroups() {
  return (
    <nav className="flex flex-col gap-2 md:mt-4" aria-label="Dashboard">
      {navGroups.map((group) => (
        <DashboardNavGroup key={group.name} group={group} />
      ))}
    </nav>
  );
}
