const layouts = {
  start: "flex min-h-[7.5rem] items-center justify-center",
  scenarios: "flex min-h-[7.5rem] flex-wrap content-center items-center gap-4",
  cardSelector:
    "grid min-h-[7.5rem] items-stretch gap-3 lg:grid-cols-[minmax(260px,1.1fr)_minmax(220px,0.84fr)_minmax(360px,1.7fr)]",
  amountInput:
    "grid min-h-[7.5rem] items-stretch gap-3 lg:grid-cols-[260px_minmax(0,1fr)]",
  results: "block min-h-[7.5rem]",
};

export default function StepContent({
  actions,
  children,
  className = "",
  id,
  variant,
}) {
  return (
    <section className="mt-4 flex min-h-[10rem] flex-col sm:mt-6 sm:min-h-[11.75rem]" id={id}>
      <div className={`${layouts[variant]} ${className}`}>{children}</div>

      {actions && (
        <div className="mt-auto flex justify-end gap-3 pt-3">{actions}</div>
      )}
    </section>
  );
}
