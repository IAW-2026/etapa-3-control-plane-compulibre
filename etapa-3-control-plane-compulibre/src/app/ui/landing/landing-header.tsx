import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export function LandingHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5 lg:px-12">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shadow-sm sm:h-9 sm:w-9 sm:text-sm">
          CL
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-primary sm:text-lg">
            CompuLibre
          </p>
          <p className="hidden text-xs font-medium text-gray-500 sm:block">
            Control Plane
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              Iniciar sesión
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <a
            href="/dashboard"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-primary transition hover:bg-secondary/60 sm:inline-flex"
          >
            Ir al panel
          </a>
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
