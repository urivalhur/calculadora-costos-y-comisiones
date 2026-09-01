"use client";

import { useState } from "react";

import { monthOptions } from "./AmountInput";
import { banks, getBankById } from "./CardSelector";
import ResultsChart from "./ResultsChart";
import { scenarioCards } from "./ScenarioCards";

const defaultSimulation = {
  amount: "11000",
  months: 12,
  selectedBankId: "bbva",
  selectedCardId: "bbva-azul",
  selectedScenario: "minimo",
};

function CompactSelect({
  id,
  isOpen,
  label,
  onSelect,
  onToggle,
  options,
  value,
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-label={label}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-[#F3F4F6] focus:outline-none focus:ring-4 focus:ring-slate-200"
        onClick={() => onToggle(id)}
        type="button"
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
            {label}
          </span>
          <span className="block truncate text-sm font-extrabold text-slate-950">
            {selectedOption?.label || "--"}
          </span>
        </span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-slate-300 transition ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 9.5l6 6 6-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="grid gap-1">
            {options.map((option) => (
              <button
                className={`rounded-lg px-3 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-slate-200 ${
                  option.value === value
                    ? "bg-[#181D27] text-white"
                    : "text-slate-950 hover:bg-slate-50"
                }`}
                key={option.value}
                onClick={() => onSelect(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StartCards() {
  const [hasStarted, setHasStarted] = useState(false);
  const [exitMode, setExitMode] = useState(null);
  const [openControl, setOpenControl] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(
    defaultSimulation.selectedScenario,
  );
  const [selectedBankId, setSelectedBankId] = useState(
    defaultSimulation.selectedBankId,
  );
  const [selectedCardId, setSelectedCardId] = useState(
    defaultSimulation.selectedCardId,
  );
  const [amount, setAmount] = useState(defaultSimulation.amount);
  const [months, setMonths] = useState(defaultSimulation.months);
  const amountValue = Number(amount || 0);
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
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
  const formattedAmount = amount ? amountValue.toLocaleString("es-MX") : "";
  const isExiting = Boolean(exitMode);

  const updateSelectedCard = (cardId) => {
    setSelectedCardId(cardId);
    setOpenControl(null);
  };

  const updateSelectedBank = (bankId) => {
    const nextBank = getBankById(bankId);

    setSelectedBankId(nextBank.id);
    setSelectedCardId(nextBank.cards[0]?.id || "");
    setOpenControl(null);
  };

  const updateScenario = (scenarioId) => {
    setSelectedScenario(scenarioId);
    setOpenControl(null);
  };

  const updateAmount = (event) => {
    const rawAmount = event.target.value.replace(/[^0-9]/g, "");
    const nextAmount = Number(rawAmount || 0);

    setAmount(rawAmount ? String(Math.min(nextAmount, 200000)) : "");
  };

  const showFlow = () => {
    setExitMode(null);
    setHasStarted(true);
  };

  const startTutorial = () => {
    if (isExiting) {
      return;
    }

    setExitMode("start");
  };

  const skipTutorial = () => {
    if (isExiting) {
      return;
    }

    setExitMode("skip");
  };

  const restartFlow = () => {
    setHasStarted(false);
    setSelectedScenario(defaultSimulation.selectedScenario);
    setSelectedBankId(defaultSimulation.selectedBankId);
    setSelectedCardId(defaultSimulation.selectedCardId);
    setAmount(defaultSimulation.amount);
    setMonths(defaultSimulation.months);
    setExitMode(null);
  };

  return (
    <div className="mt-4 max-w-full sm:mt-7" aria-labelledby="start-cards-title">
      <div className="box-border min-h-[30rem] max-w-full px-0 sm:min-h-[34rem] sm:max-w-4xl sm:px-5">
        {!hasStarted && (
          <div className="flex min-h-[10rem] flex-col items-stretch justify-center gap-3 sm:min-h-[11.75rem]">
            <div className="relative h-14 w-full">
              <button
                className={`tutorial-button-shell flex items-center justify-center overflow-hidden rounded-full border border-[#181D27] bg-[#181D27] px-6 py-4 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(24,29,39,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 ${
                  isExiting ? "tutorial-button-compress" : ""
                }`}
                disabled={isExiting}
                onAnimationEnd={(event) => {
                  if (event.currentTarget === event.target) {
                    showFlow();
                  }
                }}
                onClick={startTutorial}
                type="button"
              >
                <span
                  className={isExiting ? "tutorial-button-label-out" : ""}
                >
                  comenzar tutorial
                </span>
              </button>
            </div>
            <button
              className={`self-center px-3 py-2 text-sm font-bold text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-[#181D27] focus:outline-none focus:ring-4 focus:ring-slate-200 ${
                isExiting ? "tutorial-skip-float-out" : ""
              }`}
              disabled={isExiting}
              onClick={skipTutorial}
              type="button"
            >
              saltar tutorial
            </button>
          </div>
        )}

        {hasStarted && (
          <div className="grid min-w-0 max-w-full gap-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
              Ajusta tu simulaci&oacute;n
            </p>
            <div className="grid min-w-0 max-w-full gap-3">
              <CompactSelect
                id="scenario"
                isOpen={openControl === "scenario"}
                label="Escenario"
                onSelect={updateScenario}
                onToggle={(nextControl) =>
                  setOpenControl((current) =>
                    current === nextControl ? null : nextControl,
                  )
                }
                options={scenarioOptions}
                value={selectedScenario}
              />
              <CompactSelect
                id="bank"
                isOpen={openControl === "bank"}
                label="Banco"
                onSelect={updateSelectedBank}
                onToggle={(nextControl) =>
                  setOpenControl((current) =>
                    current === nextControl ? null : nextControl,
                  )
                }
                options={bankOptions}
                value={selectedBankId}
              />
              <CompactSelect
                id="card"
                isOpen={openControl === "card"}
                label="Tarjeta"
                onSelect={updateSelectedCard}
                onToggle={(nextControl) =>
                  setOpenControl((current) =>
                    current === nextControl ? null : nextControl,
                  )
                }
                options={cardOptions}
                value={selectedCardId}
              />
            </div>

            <div className="box-border max-w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <label
                className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400"
                htmlFor="mobile-debt-amount"
              >
                Monto de la deuda
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xl font-extrabold leading-none text-[#010B2F]">
                  $
                </span>
                <input
                  className="min-w-0 flex-1 bg-transparent text-xl font-extrabold leading-none text-[#010B2F] outline-none placeholder:text-[#010B2F]"
                  id="mobile-debt-amount"
                  inputMode="numeric"
                  onChange={updateAmount}
                  placeholder="--"
                  value={formattedAmount}
                />
                <span className="text-[10px] font-extrabold uppercase text-slate-400">
                  MXN
                </span>
              </div>
            </div>

            <div className="box-border max-w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
                Tiempo a simular
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {monthOptions.map((option) => (
                  <button
                    className={`flex min-h-11 flex-col items-center justify-center rounded-[10px] border px-3 py-2 text-sm font-extrabold leading-tight transition focus:outline-none focus:ring-4 focus:ring-slate-200 ${
                      months === option
                        ? "border-[#101828] bg-[#101828] text-white"
                        : "border-slate-200 bg-white text-[#010B2F] hover:bg-[#F3F4F6]"
                    }`}
                    key={option}
                    onClick={() => setMonths(option)}
                    type="button"
                  >
                    <span>{option}</span>
                    <span className="text-[10px] font-bold">
                      {option === 1 ? "mes" : "meses"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          <ResultsChart
            amount={amount}
            hideResultControls
            mobileFull
            months={months}
            onChangeAmount={setAmount}
            onChangeMonths={setMonths}
            onRestart={restartFlow}
            onSelectBank={updateSelectedBank}
            onSelectCard={updateSelectedCard}
            onSelectScenario={setSelectedScenario}
            onShowPreview={() => {}}
            selectedBankId={selectedBankId}
            selectedCardId={selectedCardId}
            selectedScenario={selectedScenario}
            showGraphInitially
          />
          </div>
        )}
      </div>
    </div>
  );
}
