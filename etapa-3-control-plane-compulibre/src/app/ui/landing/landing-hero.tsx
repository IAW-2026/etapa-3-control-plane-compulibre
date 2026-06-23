import { Show, SignInButton } from "@clerk/nextjs";

const controlAreas = [
  "Sellers",
  "Catálogo",
  "Órdenes",
  "Envíos",
  "Pagos",
  "Retiros",
];

export function LandingHero() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-20 pt-14 text-center sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
      <p className="text-sm font-semibold uppercase text-highlight">
        Administración centralizada
      </p>
      <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
        Control Plane para operar CompuLibre desde un solo lugar
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
        Supervisá vendedores, productos, ventas, envíos, pagos y retiros de
        todo el ecosistema con accesos seguros para administradores.
      </p>

      <Show when="signed-out">
        <div className="mt-8">
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <button
              type="button"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-highlight/85"
            >
              Acceder como administrador
            </button>
          </SignInButton>
        </div>
      </Show>

      <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-16">
        {controlAreas.map((area) => (
          <div
            key={area}
            className="rounded-lg border border-primary/10 bg-secondary/60 px-4 py-4 text-sm font-semibold text-primary shadow-sm"
          >
            {area}
          </div>
        ))}
      </div>
    </section>
  );
}
