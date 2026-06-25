import { ShippingForm } from "@/app/dashboard/ui/shipping/shipping-form";

export default function NewShipmentPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Shipping
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">Crear envio</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Carga los datos necesarios para crear una etiqueta en Shipping App.
        </p>
      </header>

      <ShippingForm />
    </div>
  );
}

