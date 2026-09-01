import StepContent from "./StepContent";

export const scenarioCards = [
  {
    id: "liquidar",
    title: "Pago el total al mes",
    description: "Buena idea hacerlo.",
  },
  {
    id: "minimo",
    title: "Solo pago el m\u00ednimo",
    description: "Bien si quieres salvar una deuda.",
  },
  {
    id: "masMinimo",
    title: "Pago m\u00e1s del m\u00ednimo",
    description: "Ayuda a terminar r\u00e1pido la deuda.",
  },
  {
    id: "olvide",
    title: "Se me olvida pagar",
    description: "¡Cambia este h\u00e1bito, ya!.",
  },
  {
    id: "retiro",
    title: "Retiro efectivo",
    description: "\u00bf Como pa' qu\u00e9 restiras?",
  },
];

export default function ScenarioCards({
  selectedScenario,
  onSelectScenario,
  onNext,
  showActions = true,
}) {
  const canContinue = Boolean(selectedScenario);

  return (
    <StepContent
      actions={
        showActions ? (
        canContinue ? (
          <button
            className="action-button-enter rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
            onClick={onNext}
            type="button"
          >
            Siguiente
          </button>
        ) : (
          <span
            aria-hidden="true"
            className="invisible rounded-xl px-6 py-3 text-sm font-bold"
          >
            Siguiente
          </span>
        )
        ) : null
      }
      id="step-escenario"
      variant="scenarios"
    >
      {scenarioCards.map((scenario) => {
        const isSelected = selectedScenario === scenario.id;

        return (
          <button
            className={`group relative flex min-h-13 items-center gap-3 rounded-full py-3 pl-5 pr-6 text-left text-sm font-extrabold shadow-sm transition hover:z-30 hover:-translate-y-0.5 focus:z-30 focus:outline-none focus:ring-4 focus:ring-slate-200 ${
              isSelected
                ? "bg-[#181D27] text-white shadow-[0_14px_30px_rgba(24,29,39,0.22)]"
                : "bg-white text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.10)] hover:bg-[#F3F4F6] hover:shadow-[0_14px_30px_rgba(15,23,42,0.14)]"
            }`}
            key={scenario.id}
            onClick={() => onSelectScenario(scenario.id)}
            type="button"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                isSelected
                  ? "border-2 border-white bg-transparent"
                  : "border-2 border-slate-300 bg-white group-hover:border-[#181D27]"
              }`}
              aria-hidden="true"
            >
              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
            <span>{scenario.title}</span>
            <span className="pointer-events-none absolute bottom-full left-9 z-50 mb-3 hidden max-w-[220px] rounded-2xl rounded-bl-sm border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold leading-4 text-slate-700 shadow-[0_12px_28px_rgba(37,99,235,0.16)] group-hover:block group-focus-visible:block">
              {scenario.description}
              <span className="absolute -bottom-1 left-4 h-3 w-3 rotate-45 border-b border-r border-blue-100 bg-blue-50" />
            </span>
          </button>
        );
      })}
    </StepContent>
  );
}
