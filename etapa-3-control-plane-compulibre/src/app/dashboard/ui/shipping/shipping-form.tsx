import Link from "next/link";

import { FormSubmitButton } from "@/app/dashboard/ui/form-submit-button";
import { createShipmentFromForm } from "@/lib/shipping-actions";

const couriers = [
  { label: "Andreani", value: "Andreani" },
  { label: "OCA", value: "OCA" },
  { label: "Correo Argentino", value: "Correo Argentino" },
  { label: "Urbano", value: "Urbano" },
  { label: "DHL", value: "DHL" },
];

export function ShippingForm() {
  return (
    <form action={createShipmentFromForm} className="flex flex-col gap-6">
      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">
          Referencias del envio
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Orden seller
            <input
              required
              name="sellerOrderId"
              type="text"
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Orden buyer
            <input
              required
              name="buyerOrderId"
              type="text"
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Seller ID
            <input
              required
              name="sellerId"
              type="text"
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Tracking externo
            <input
              required
              name="externalTrackingId"
              type="text"
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Logistica</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Courier
            <select
              required
              name="courier"
              defaultValue=""
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="" disabled>
                Seleccionar courier
              </option>
              {couriers.map((courier) => (
                <option key={courier.value} value={courier.value}>
                  {courier.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Direccion de origen
            <input
              required
              name="originAddress"
              type="text"
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-gray-700">
          Direccion del comprador
          <input
            required
            name="buyerAddress"
            type="text"
            className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/dashboard/envios"
          className="rounded-lg border border-primary/20 bg-white px-4 py-2 text-center text-sm font-semibold text-primary shadow-sm transition hover:bg-secondary"
        >
          Cancelar
        </Link>
        <FormSubmitButton label="Crear envio" />
      </div>
    </form>
  );
}
