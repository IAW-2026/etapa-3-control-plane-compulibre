import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  CreditCardIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const apps = [
  {
    name: "Seller App",
    description: "Vendedores, catálogo, productos y ventas del marketplace.",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Buyer App",
    description: "Usuarios compradores, órdenes y experiencia de compra.",
    icon: CreditCardIcon,
  },
  {
    name: "Payments App",
    description: "Pagos, retiros, tickets y operaciones financieras.",
    icon: BanknotesIcon,
  },
  {
    name: "Shipping App",
    description: "Envíos, tracking y estados logísticos.",
    icon: TruckIcon,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase text-highlight">
          Control Plane
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary md:text-4xl">
          Bienvenido al panel central de CompuLibre
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 md:text-base">
          Desde acá vas a poder navegar las funciones administrativas de Seller,
          Buyer, Payments y Shipping sin entrar manualmente a cada aplicación.
        </p>
      </section>
    </div>
  );
}
