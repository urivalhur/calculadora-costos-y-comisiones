"use client";

import { useState } from "react";

import StepContent from "./StepContent";

export const monthOptions = [1, 2, 3, 6, 9, 12];

const minDebt = 100;
const maxDebt = 200000;

const debtLevels = [
  {
    max: 6000,
    color: "text-emerald-500",
    label: "deuda peque\u00f1a",
  },
  {
    max: 30000,
    color: "text-yellow-500",
    label: "para peque\u00f1os negocios",
  },
  {
    max: 60000,
    color: "text-orange-500",
    label: "para algo importante",
  },
  {
    max: maxDebt,
    color: "text-red-500",
    label: "debes ser bueno, muy bueno",
  },
];

export default function AmountInput({
  amount,
  months,
  onBack,
  onChangeAmount,
  onChangeMonths,
  onNext,
  showActions = true,
}) {
  const [amountFocused, setAmountFocused] = useState(false);
  const amountValue = Number(amount || 0);
  const debtLevel =
    amountValue >= minDebt
      ? debtLevels.find((level) => amountValue <= level.max) || debtLevels.at(-1)
      : null;
  const formattedAmount = amount ? amountValue.toLocaleString("es-MX") : "";
  const canContinue = amountValue >= minDebt && Boolean(months);

  const updateAmount = (event) => {
    const rawAmount = event.target.value.replace(/[^0-9]/g, "");
    const nextAmount = Number(rawAmount || 0);

    if (!rawAmount) {
      onChangeAmount("");
      return;
    }

    onChangeAmount(String(Math.min(nextAmount, maxDebt)));
  };

  return (
    <StepContent
      actions={
        showActions ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`action-button-reveal rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-100 ${
              showActions
                ? "action-button-reveal-visible"
                : "action-button-reveal-hidden"
            }`}
            onClick={onBack}
            type="button"
          >
            Regresar
          </button>
          {canContinue ? (
            <button
              className="action-button-enter rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
              onClick={onNext}
              type="button"
            >
              Finalizar
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="invisible rounded-xl px-6 py-3 text-sm font-bold"
            >
              Finalizar
            </span>
          )}
        </div>
        ) : null
      }
      id="step-monto"
      variant="amountInput"
    >
      <div className="group relative flex min-h-16 flex-col justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 shadow-sm transition-all duration-300 ease-out hover:z-30 focus-within:z-30">
        <div className="flex items-start justify-between gap-4">
          <label
            className="block text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate-500"
            htmlFor="debt-amount"
          >
            Monto de la deuda
          </label>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <span
            className={`text-2xl font-extrabold leading-none opacity-75 transition-colors duration-300 ease-out ${
              debtLevel?.color || "text-[#010B2F]"
            }`}
          >
            $
          </span>
          <input
            className="min-w-0 flex-1 bg-transparent text-2xl font-extrabold leading-none text-[#010B2F] outline-none transition-colors duration-300 ease-out placeholder:text-[#010B2F]"
            id="debt-amount"
            inputMode="numeric"
            onBlur={() => setAmountFocused(false)}
            onChange={updateAmount}
            onFocus={() => setAmountFocused(true)}
            placeholder={amountFocused ? "" : "--"}
            value={formattedAmount}
          />
          <span className="text-xs font-extrabold text-slate-400">MXN</span>
        </div>

        <div className="mt-2 min-h-4 text-xs font-bold transition-all duration-300 ease-out">
          {debtLevel && <span className="text-slate-400">{debtLevel.label}</span>}
        </div>

        {!amount && (
          <span className="pointer-events-none absolute bottom-full left-9 z-50 mb-3 hidden max-w-[220px] rounded-2xl rounded-bl-sm border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold leading-4 text-slate-700 shadow-[0_12px_28px_rgba(37,99,235,0.16)] group-hover:block group-focus-within:block">
            min $100 / max $200,000
            <span className="absolute -bottom-1 left-4 h-3 w-3 rotate-45 border-b border-r border-blue-100 bg-blue-50" />
          </span>
        )}
      </div>

      <div className="flex min-h-16 flex-col justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 shadow-sm transition-all duration-300 ease-out">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
          Tiempo a simular
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {monthOptions.map((option) => (
            <button
              className={`flex min-h-11 flex-col items-center justify-center rounded-[10px] border px-4 py-2 text-sm font-extrabold leading-tight transition duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-slate-200 ${
                months === option
                  ? "border-[#101828] bg-[#101828] text-white"
                  : "border-slate-200 bg-white text-[#010B2F] hover:-translate-y-0.5 hover:bg-[#F3F4F6] hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)]"
              }`}
              key={option}
              onClick={() => onChangeMonths(option)}
              type="button"
            >
              <span>{option}</span>
              <span className="text-[11px] font-bold">
                {option === 1 ? "mes" : "meses"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </StepContent>
  );
}
