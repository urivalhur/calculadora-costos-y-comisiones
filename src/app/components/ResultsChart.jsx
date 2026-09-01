"use client";

import { useState } from "react";

import { monthOptions } from "./AmountInput";
import { banks, getBankById } from "./CardSelector";
import { scenarioCards } from "./ScenarioCards";
import StepContent from "./StepContent";

const months = Array.from({ length: 12 }, (_, index) => `Mes ${index + 1}`);
const debtData = [11000, 9900, 8900, 7800, 6600, 5400, 4200, 2900, 1500, 150, 0, 0];
const costData = [550, 1050, 1500, 1900, 2300, 2600, 2850, 3000, 3150, 3250, 3250, 3260];

const chart = {
  width: 760,
  height: 330,
  padding: {
    bottom: 42,
    left: 56,
    right: 24,
    top: 20,
  },
};

const maxValue = 12000;
const yTicks = [0, 2000, 4000, 6000, 8000, 10000, 12000];
const plotWidth = chart.width - chart.padding.left - chart.padding.right;
const plotHeight = chart.height - chart.padding.top - chart.padding.bottom;

const genericCosts = {
  latePayment: "$420",
  tiie: "11.25%",
  withdrawal: "6.5%",
};

const scenarioSummaries = {
  liquidar:
    "\u00a1Felicidades! Tienes el mejor h\u00e1bito de todos. Pagar el total cada mes, ya sea pago para no generar intereses o pago de cosas que compraste de contado, no genera costo alguno. Eres responsable, \u00a1te ganaste tu tarjeta!",
};

const formatCurrency = (value) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const getPoint = (value, index) => {
  const x = chart.padding.left + (plotWidth / (months.length - 1)) * index;
  const y =
    chart.padding.top +
    plotHeight -
    (Math.min(value, maxValue) / maxValue) * plotHeight;

  return { x, y };
};

const toPoints = (data) => data.map((value, index) => getPoint(value, index));

const toPath = (points) =>
  points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

const toAreaPath = (points) => {
  const first = points[0];
  const last = points[points.length - 1];
  const baseline = chart.padding.top + plotHeight;

  return `${toPath(points)} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
};

function getScenarioSummary(selectedScenarioId, scenarioTitle) {
  if (scenarioSummaries[selectedScenarioId]) {
    return scenarioSummaries[selectedScenarioId];
  }

  const normalizedTitle = scenarioTitle
    ? scenarioTitle.charAt(0).toLowerCase() + scenarioTitle.slice(1)
    : "este escenario";

  return `El h\u00e1bito de ${normalizedTitle} forma parte de una estrategia para saldar deudas que ya nos han rebasado. Combinada con otras herramientas puedes salir del problema sin problemas.`;
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className={strong ? "font-extrabold text-slate-950" : "font-medium text-slate-500"}>
        {label}
      </span>
      <span className={strong ? "font-extrabold text-slate-950" : "font-extrabold text-slate-800"}>
        {value}
      </span>
    </div>
  );
}

function CostDetails({ amountValue, selectedCard, showButton = true, totalCost }) {
  return (
    <>
      <div className="mt-4 border-t border-slate-200 pt-4 sm:mt-5">
        <div className="grid gap-2">
          <SummaryRow label="CAT:" value={selectedCard?.cat || "--"} />
          <SummaryRow label="TIIE:" value={genericCosts.tiie} />
          <SummaryRow
            label="Pago tard&iacute;o:"
            value={genericCosts.latePayment}
          />
          <SummaryRow label="Retiro:" value={genericCosts.withdrawal} />
        </div>
      </div>

      <div className="mt-4 border-t border-slate-200 pt-4 sm:mt-5">
        <SummaryRow
          label="Costo total:"
          strong
          value={amountValue ? formatCurrency(totalCost) : "--"}
        />
      </div>

      <div className="mt-4 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500 sm:mt-5">
        - anualidad {selectedCard?.fee || "--"} y seguros, si aplican
      </div>

      {showButton && (
        <button
          className="mt-4 w-full rounded-full border border-[#181D27] bg-[#181D27] px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-[#181D27] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200 sm:mt-5"
          type="button"
        >
          &iexcl;me interesa!
        </button>
      )}
    </>
  );
}

function ResultDropdown({
  className = "",
  id,
  isOpen,
  label,
  onClose,
  onSelect,
  onToggle,
  options,
  placeholder,
  value,
}) {
  const selectedOption = options.find((option) => option.value === value);

  const selectOption = (nextValue) => {
    onSelect(nextValue);
    onClose();
  };

  return (
    <div
      className={`relative ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onClose();
        }
      }}
    >
      <button
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white py-3 pl-5 pr-4 text-left text-sm font-extrabold text-slate-950 shadow-sm outline-none transition duration-150 hover:-translate-y-0.5 hover:bg-[#F3F4F6] hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)] focus:border-blue-100 focus:ring-4 focus:ring-blue-100"
        aria-label={label}
        onClick={() => onToggle(id)}
        type="button"
      >
        <span
          className={`truncate ${selectedOption ? "text-[#181D27]" : "text-slate-500"}`}
        >
          {selectedOption?.label || placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 z-40 mb-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-slate-200 bg-white shadow-[6px_6px_14px_rgba(15,23,42,0.08)]"
          />
          <div className="clean-scrollbar flex max-h-40 flex-wrap content-start gap-1 overflow-y-auto">
            {options.map((option) => (
              <button
                className={`group relative rounded-lg px-3 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                  option.value === value
                    ? "text-[#181D27] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:bg-[#181D27]/30 after:shadow-[0_0_8px_rgba(24,29,39,0.22)]"
                    : "text-slate-950"
                }`}
                key={option.value}
                onClick={() => selectOption(option.value)}
                type="button"
              >
                <span className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#181D27]/0 blur-[10px] transition duration-150 group-hover:bg-[#181D27]/15" />
                <span className="relative z-10">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function JourneySummary({
  amountValue,
  compactCost = false,
  onRestart,
  onShowGraph,
  selectedBank,
  selectedCard,
  selectedMonths,
  selectedScenarioCard,
  showGraph,
}) {
  const selectedMonthsLabel = selectedMonths
    ? `${selectedMonths} ${selectedMonths === 1 ? "mes" : "meses"}`
    : "--";
  const summaryCopy = getScenarioSummary(
    selectedScenarioCard?.id,
    selectedScenarioCard?.title,
  );

  return (
    <div
      className={`relative box-border w-full min-w-0 rounded-3xl border border-slate-200 bg-white shadow-sm ${
        compactCost ? "px-5 py-5 sm:py-6" : "min-h-[330px] px-7 py-7"
      }`}
      id="results-journey"
    >
      {!compactCost && (
        <button
          aria-label="Volver a comenzar"
          className="group absolute right-5 top-5 rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition duration-150 hover:z-30 hover:-translate-y-0.5 hover:bg-[#181D27] hover:text-white hover:shadow-md focus:z-30 focus:outline-none focus:ring-4 focus:ring-slate-200"
          onClick={onRestart}
          type="button"
        >
          <span className="pointer-events-none absolute bottom-full right-0 z-50 mb-3 hidden max-w-[220px] rounded-2xl rounded-br-sm border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold leading-4 text-slate-700 shadow-[0_12px_28px_rgba(37,99,235,0.16)] group-hover:block group-focus-visible:block">
            reiniciar
            <span className="absolute -bottom-1 right-4 h-3 w-3 rotate-45 border-b border-r border-blue-100 bg-blue-50" />
          </span>
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 7H5V3M5.4 7A8 8 0 1 1 4 11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      )}

      <h3
        className={`font-extrabold tracking-normal text-slate-950 ${
          compactCost ? "text-xl" : "text-3xl"
        }`}
      >
        Resumen
      </h3>

      <p
        className={`text-[#010B2F] ${
          compactCost ? "mt-3 text-sm leading-6 sm:mt-4" : "mt-5 text-base leading-7"
        }`}
      >
        Elegiste el escenario{" "}
        <strong>{selectedScenarioCard?.title || "--"}</strong> y tu tarjeta es{" "}
        <strong>{selectedCard?.name || "--"}</strong> del banco{" "}
        <strong>{selectedBank?.name || "--"}</strong>. Tu deuda es de{" "}
        <strong>{amountValue ? formatCurrency(amountValue) : "--"}</strong> y la
        proyectaste a <strong>{selectedMonthsLabel}</strong>.
      </p>

      <div className={compactCost ? "mt-4 sm:mt-5" : ""}>
        <p
          className={`max-w-3xl text-[#010B2F] ${
            compactCost ? "text-sm leading-6" : "mt-6 text-base leading-7"
          }`}
        >
          {summaryCopy}
        </p>

        <p
          className={`text-[#010B2F] ${
            compactCost ? "mt-4 text-sm leading-6 sm:mt-5" : "mt-6 text-base leading-7"
          }`}
        >
          Si quieres aprender m&aacute;s sobre finanzas te invitamos a seguir:
        </p>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-extrabold text-blue-600">
          <a className="hover:text-[#181D27]" href="#">
            Nuestro blog
          </a>
          <a className="hover:text-[#181D27]" href="#">
            Nuestras herramientas
          </a>
        </div>
      </div>

      {!showGraph && (
        <button
          className="mt-7 flex items-center rounded-full border border-[#181D27] bg-[#181D27] py-2.5 pl-5 pr-6 text-sm font-extrabold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-[#181D27] hover:shadow-[0_14px_30px_rgba(15,23,42,0.14)] focus:outline-none focus:ring-4 focus:ring-slate-200"
          onClick={onShowGraph}
          type="button"
        >
          Ver gr&aacute;fica
        </button>
      )}

    </div>
  );
}

function ChartPanel({
  amountValue,
  costPoints,
  debtPoints,
  selectedCard,
  showCostDetails = false,
  totalCost,
}) {
  return (
    <div className="box-border min-w-0 max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-7 sm:py-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500 sm:tracking-[0.35em]">
        Evoluci&oacute;n de la deuda
      </p>

      <div className="mt-4 sm:mt-6">
        <svg
          aria-label="Gr&aacute;fico de evoluci&oacute;n de la deuda"
          className="h-auto w-full"
          role="img"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
        >
          <defs>
            <linearGradient id="balanceArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y = getPoint(tick, 0).y;

            return (
              <g key={tick}>
                <line
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  x1={chart.padding.left}
                  x2={chart.width - chart.padding.right}
                  y1={y}
                  y2={y}
                />
                <text
                  fill="#52525B"
                  fontSize="12"
                  textAnchor="end"
                  x={chart.padding.left - 12}
                  y={y + 4}
                >
                  {formatCurrency(tick)}
                </text>
              </g>
            );
          })}

          <path d={toAreaPath(debtPoints)} fill="url(#balanceArea)" />
          <path
            d={toPath(debtPoints)}
            fill="none"
            stroke="#4A9EF8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d={toPath(costPoints)}
            fill="none"
            stroke="#5B4BFF"
            strokeDasharray="8 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />

          {debtPoints.map((point, index) => (
            <circle
              cx={point.x}
              cy={point.y}
              fill="#4A9EF8"
              key={`debt-${index}`}
              r="3.5"
            />
          ))}

          {costPoints.map((point, index) => (
            <circle
              cx={point.x}
              cy={point.y}
              fill="#5B4BFF"
              key={`interest-${index}`}
              r="3"
            />
          ))}

          {months.map((month, index) => {
            const x = getPoint(0, index).x;

            return (
              <text
                fill="#52525B"
                fontSize="12"
                key={month}
                textAnchor="middle"
                x={x}
                y={chart.height - 12}
              >
                {month}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-600">
        <span className="flex items-center gap-2">
          <svg aria-hidden="true" className="h-3 w-8" viewBox="0 0 32 12">
            <line
              stroke="#4A9EF8"
              strokeLinecap="round"
              strokeWidth="3"
              x1="2"
              x2="30"
              y1="6"
              y2="6"
            />
          </svg>
          Deuda
        </span>
        <span className="flex items-center gap-2">
          <svg aria-hidden="true" className="h-3 w-8" viewBox="0 0 32 12">
            <line
              stroke="#5B4BFF"
              strokeDasharray="5 4"
              strokeLinecap="round"
              strokeWidth="3"
              x1="2"
              x2="30"
              y1="6"
              y2="6"
            />
          </svg>
          Costos y comisiones
        </span>
      </div>

      {showCostDetails && (
        <CostDetails
          amountValue={amountValue}
          selectedCard={selectedCard}
          totalCost={totalCost}
        />
      )}
    </div>
  );
}

function ResultControls({
  amount,
  onChangeAmount,
  onChangeMonths,
  onSelectBank,
  onSelectCard,
  onSelectScenario,
  selectedBank,
  selectedBankId,
  selectedCardId,
  selectedMonths,
  selectedScenario,
}) {
  const [openControl, setOpenControl] = useState(null);
  const scenarioOptions = scenarioCards.map((scenario) => ({
    label: scenario.title,
    value: scenario.id,
  }));
  const bankOptions = banks.map((bank) => ({
    label: bank.name,
    value: bank.id,
  }));
  const cardOptions =
    selectedBank?.cards.map((card) => ({
      label: card.name,
      value: card.id,
    })) || [];
  const monthResultOptions = monthOptions.map((option) => ({
    label: `${option} ${option === 1 ? "mes" : "meses"}`,
    value: String(option),
  }));

  return (
    <div className="mt-5 border-t border-slate-200 pt-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <ResultDropdown
          id="scenario"
          isOpen={openControl === "scenario"}
          label="Escenario"
          onClose={() => setOpenControl(null)}
          onSelect={onSelectScenario}
          onToggle={(nextControl) =>
            setOpenControl((current) =>
              current === nextControl ? null : nextControl,
            )
          }
          options={scenarioOptions}
          placeholder="Escenario"
          value={selectedScenario || ""}
        />
        <ResultDropdown
          id="bank"
          isOpen={openControl === "bank"}
          label="Banco"
          onClose={() => setOpenControl(null)}
          onSelect={onSelectBank}
          onToggle={(nextControl) =>
            setOpenControl((current) =>
              current === nextControl ? null : nextControl,
            )
          }
          options={bankOptions}
          placeholder="Banco"
          value={selectedBankId}
        />
        <ResultDropdown
          id="card"
          isOpen={openControl === "card"}
          label="Tarjeta"
          onClose={() => setOpenControl(null)}
          onSelect={onSelectCard}
          onToggle={(nextControl) =>
            setOpenControl((current) =>
              current === nextControl ? null : nextControl,
            )
          }
          options={cardOptions}
          placeholder="Tarjeta"
          value={selectedCardId}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-start gap-3">
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-3 text-sm font-bold text-slate-950 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-[#F3F4F6] hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)] focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
          <span className="mr-2 text-slate-400">$</span>
          <input
            className="w-[6ch] bg-transparent text-sm font-bold text-slate-950 outline-none placeholder:text-slate-500"
            aria-label="Monto"
            inputMode="numeric"
            onChange={onChangeAmount}
            placeholder="Monto"
            value={amount}
          />
          <span className="ml-2 text-xs font-extrabold text-slate-400">mxn</span>
        </div>
        <ResultDropdown
          className="w-36"
          id="months"
          isOpen={openControl === "months"}
          label="Tiempo"
          onClose={() => setOpenControl(null)}
          onSelect={(nextValue) => onChangeMonths(nextValue ? Number(nextValue) : null)}
          onToggle={(nextControl) =>
            setOpenControl((current) =>
              current === nextControl ? null : nextControl,
            )
          }
          options={monthResultOptions}
          placeholder="Tiempo"
          value={selectedMonths ? String(selectedMonths) : ""}
        />
      </div>
    </div>
  );
}

function CostSidebar({ amountValue, selectedCard, totalCost }) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
      <h3 className="text-xl font-extrabold text-slate-950">Resumen</h3>

      <CostDetails
        amountValue={amountValue}
        selectedCard={selectedCard}
        showButton={false}
        totalCost={totalCost}
      />
    </aside>
  );
}

export default function ResultsChart({
  amount,
  hideResultControls = false,
  mobileFull = false,
  months: selectedMonths,
  onChangeAmount,
  onChangeMonths,
  onRestart,
  onSelectBank,
  onSelectCard,
  onSelectScenario,
  onShowPreview,
  selectedBankId,
  selectedCardId,
  selectedScenario,
  showGraphInitially = false,
}) {
  const [showGraph, setShowGraph] = useState(showGraphInitially);
  const debtPoints = toPoints(debtData);
  const costPoints = toPoints(costData);
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const selectedCard =
    selectedBank?.cards.find((card) => card.id === selectedCardId) || null;
  const selectedScenarioCard = scenarioCards.find(
    (scenario) => scenario.id === selectedScenario,
  );
  const amountValue = Number(amount || 0);
  const estimatedInterest = amountValue ? Math.round(amountValue * 0.0927) : 0;
  const totalCost = amountValue + estimatedInterest + 420;

  const updateBank = (bankId) => {
    onSelectBank(bankId);
    onSelectCard("");
    if (bankId) {
      onShowPreview();
    }
  };

  const updateCard = (cardId) => {
    onSelectCard(cardId);
    if (cardId) {
      onShowPreview();
    }
  };

  const updateAmount = (event) => {
    const rawAmount = event.target.value.replace(/[^0-9]/g, "");
    const nextAmount = Number(rawAmount || 0);

    onChangeAmount(rawAmount ? String(Math.min(nextAmount, 200000)) : "");
  };

  const scrollToJourney = () => {
    window.requestAnimationFrame(() => {
      const target = document.getElementById("results-journey");

      if (!target) {
        return;
      }

      const startPosition = window.scrollY;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - 24;
      const distance = targetPosition - startPosition;
      const duration = 780;
      const startedAt = performance.now();
      const easeIn = (progress) => progress ** 3;

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startedAt;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, startPosition + distance * easeIn(progress));

        if (progress < 1) {
          window.requestAnimationFrame(animateScroll);
        }
      };

      window.requestAnimationFrame(animateScroll);
    });
  };

  const showGraphAndFocusJourney = () => {
    setShowGraph(true);
    scrollToJourney();
  };

  if (mobileFull) {
    return (
      <StepContent className="-mt-3 sm:mt-0" id="step-resultados" variant="results">
        <div className="grid w-full min-w-0 gap-4">
          <ChartPanel
            amountValue={amountValue}
            costPoints={costPoints}
            debtPoints={debtPoints}
            selectedCard={selectedCard}
            showCostDetails
            totalCost={totalCost}
          />
          <JourneySummary
            amountValue={amountValue}
            compactCost
            onRestart={onRestart}
            onShowGraph={showGraphAndFocusJourney}
            selectedBank={selectedBank}
            selectedCard={selectedCard}
            selectedMonths={selectedMonths}
            selectedScenarioCard={selectedScenarioCard}
            showGraph
          />
        </div>
      </StepContent>
    );
  }

  return (
    <StepContent
      actions={
        showGraph ? (
          <button
            className="group action-button-enter w-[215px] rounded-xl border border-[#181D27] bg-[#181D27] px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-[#181D27] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
            type="button"
          >
            <span className="group-hover:hidden">&iexcl;me interesa!</span>
            <span className="hidden group-hover:inline">Ver tarjeta</span>
          </button>
        ) : null
      }
      id="step-resultados"
      variant="results"
    >
      <JourneySummary
        amountValue={amountValue}
        onRestart={onRestart}
        onShowGraph={showGraphAndFocusJourney}
        selectedBank={selectedBank}
        selectedCard={selectedCard}
        selectedMonths={selectedMonths}
        selectedScenarioCard={selectedScenarioCard}
        showGraph={showGraph}
      />

      {showGraph && (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_215px]">
          <div>
            <ChartPanel costPoints={costPoints} debtPoints={debtPoints} />
            {!hideResultControls && (
              <ResultControls
                amount={amount}
                onChangeAmount={updateAmount}
                onChangeMonths={onChangeMonths}
                onSelectBank={updateBank}
                onSelectCard={updateCard}
                onSelectScenario={onSelectScenario}
                selectedBank={selectedBank}
                selectedBankId={selectedBankId}
                selectedCardId={selectedCardId}
                selectedMonths={selectedMonths}
                selectedScenario={selectedScenario}
              />
            )}
          </div>

          <CostSidebar
            amountValue={amountValue}
            selectedCard={selectedCard}
            totalCost={totalCost}
          />
        </div>
      )}
    </StepContent>
  );
}
