import Link from "next/link";

import { getShipmentStatusLabel } from "@/lib/shipping-labels";

const SHIPMENT_STATUSES = ["LABEL_CREATED", "IN_TRANSIT", "DELIVERED"];

export function ShipmentStatusFilter({
  status,
  query,
}: {
  status: string;
  query: string;
}) {
  const options = ["", ...SHIPMENT_STATUSES];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const params = new URLSearchParams({ page: "1" });

        if (query) {
          params.set("q", query);
        }

        if (option) {
          params.set("status", option);
        }

        const isActive = status === option;

        return (
          <Link
            key={option || "all"}
            href={`/dashboard/envios?${params.toString()}`}
            className={[
              "rounded-lg border px-3 py-2 text-sm font-semibold transition",
              isActive
                ? "border-primary bg-primary text-white"
                : "border-primary/15 bg-white text-primary hover:bg-accent/35",
            ].join(" ")}
          >
            {option ? getShipmentStatusLabel(option) : "Todos"}
          </Link>
        );
      })}
    </div>
  );
}

