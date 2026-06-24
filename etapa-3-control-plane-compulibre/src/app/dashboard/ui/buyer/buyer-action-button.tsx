"use client";

import {
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
  MapPinIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";

import {
  resetBuyerAllFromForm,
  resetBuyerFormFromForm,
  resetBuyerOrdersFromForm,
  toggleBuyerStatusFromForm,
} from "@/lib/buyer-actions";

type BuyerAction = "toggle-status" | "reset-form" | "reset-orders" | "reset-all";

const ACTION_CONFIG: Record<
  BuyerAction,
  {
    label: string;
    title: string;
    description: string;
    confirmLabel: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    variant: "primary" | "danger";
  }
> = {
  "toggle-status": {
    label: "Suspender/reactivar",
    title: "Cambiar estado del comprador",
    description:
      "Esta accion suspende o reactiva el acceso del comprador segun su estado actual.",
    confirmLabel: "Cambiar estado",
    icon: NoSymbolIcon,
    variant: "primary",
  },
  "reset-form": {
    label: "Limpiar direccion",
    title: "Limpiar direccion del comprador",
    description:
      "Esta accion elimina los datos del formulario de envio del comprador.",
    confirmLabel: "Limpiar direccion",
    icon: MapPinIcon,
    variant: "danger",
  },
  "reset-orders": {
    label: "Borrar ordenes",
    title: "Borrar historial de ordenes",
    description:
      "Esta accion elimina el historial de ordenes del comprador y no se puede deshacer.",
    confirmLabel: "Borrar ordenes",
    icon: ArchiveBoxXMarkIcon,
    variant: "danger",
  },
  "reset-all": {
    label: "Reset total",
    title: "Eliminar datos del perfil",
    description:
      "Esta accion resetea todos los datos del comprador y no se puede deshacer.",
    confirmLabel: "Reset total",
    icon: ArrowPathIcon,
    variant: "danger",
  },
};

function getAction(action: BuyerAction, buyerId: string) {
  if (action === "toggle-status") {
    return toggleBuyerStatusFromForm.bind(null, buyerId);
  }

  if (action === "reset-form") {
    return resetBuyerFormFromForm.bind(null, buyerId);
  }

  if (action === "reset-orders") {
    return resetBuyerOrdersFromForm.bind(null, buyerId);
  }

  return resetBuyerAllFromForm.bind(null, buyerId);
}

export function BuyerActionButton({
  buyerId,
  buyerName,
  action,
}: {
  buyerId: string;
  buyerName: string;
  action: BuyerAction;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const config = ACTION_CONFIG[action];
  const submitAction = getAction(action, buyerId);
  const Icon = config.icon;
  const isDanger = config.variant === "danger";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
          isDanger
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-primary text-white hover:bg-primary/90",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {config.label}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setIsOpen(false);
            }
          }}
        >
          <section
            className="w-full max-w-md rounded-lg border border-primary/10 bg-white p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`buyer-action-title-${buyerId}-${action}`}
          >
            <h2
              id={`buyer-action-title-${buyerId}-${action}`}
              className="text-lg font-semibold text-primary"
            >
              {config.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {config.description}
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Comprador:{" "}
              <span className="font-semibold text-gray-950">{buyerName}</span>
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-secondary"
              >
                Cancelar
              </button>
              <form action={submitAction}>
                <button
                  type="submit"
                  className={[
                    "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition",
                    isDanger
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-primary hover:bg-primary/90",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {config.confirmLabel}
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
