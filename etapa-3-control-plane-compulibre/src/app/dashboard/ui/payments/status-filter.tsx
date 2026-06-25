import Link from "next/link";

type StatusOption = {
  label: string;
  value: string;
};

export function StatusFilter({
  basePath,
  status,
  options,
}: {
  basePath: string;
  status: string;
  options: StatusOption[];
}) {
  const allOptions = [{ label: "Todos", value: "" }, ...options];

  return (
    <div className="flex flex-wrap gap-2">
      {allOptions.map((option) => {
        const params = new URLSearchParams({ page: "1" });

        if (option.value) {
          params.set("status", option.value);
        }

        const isActive = status === option.value;

        return (
          <Link
            key={option.value || "all"}
            href={`${basePath}?${params.toString()}`}
            className={[
              "rounded-lg border px-3 py-2 text-sm font-semibold transition",
              isActive
                ? "border-primary bg-primary text-white"
                : "border-primary/15 bg-white text-primary hover:bg-accent/35",
            ].join(" ")}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
