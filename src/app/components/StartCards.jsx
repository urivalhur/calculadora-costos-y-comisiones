"use client";

import { useState } from "react";

import AmountInput from "./AmountInput";
import CardSelector from "./CardSelector";
import ResultsChart from "./ResultsChart";
import ScenarioCards from "./ScenarioCards";
import StepContent from "./StepContent";

const steps = [
  {
    step: "1",
    title: "Elige un escenario",
    description: "\u00a1Cada forma de pagar tiene un costo distinto!",
  },
  {
    step: "2",
    title: "Selecciona una tarjeta",
    description: "Elige el producto de tu inter\u00e9s.",
  },
  {
    step: "3",
    title: "Ingresa un monto",
    description: "Define el monto y horizonte de tu deuda.",
  },
  {
    step: "4",
    title: "Analiza los resultados",
    description: "Conoce el resumen de tus desiciones financieras.",
  },
];

export default function StartCards() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [visitedSteps, setVisitedSteps] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [hasCardPreview, setHasCardPreview] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState(null);
  const [unlockedActionSteps, setUnlockedActionSteps] = useState([]);
  const amountValue = Number(amount || 0);
  const hasCardData = Boolean(selectedBankId && selectedCardId);
  const hasAmountData = amountValue >= 100 && Boolean(months);
  const showCardActions =
    hasCardData || unlockedActionSteps.includes("2");
  const showAmountActions =
    hasAmountData || unlockedActionSteps.includes("3");
  const showStart = selectedStep === null;
  const showScenarios = selectedStep === "1";
  const showCardSelector = selectedStep === "2";
  const showAmountInput = selectedStep === "3";
  const showResults = selectedStep === "4";

  const unlockStepActions = (step) => {
    setUnlockedActionSteps((currentSteps) =>
      currentSteps.includes(step) ? currentSteps : [...currentSteps, step],
    );
  };

  const updateSelectedCard = (cardId) => {
    setSelectedCardId(cardId);

    if (selectedBankId && cardId) {
      unlockStepActions("2");
    }
  };

  const updateAmount = (nextAmount) => {
    setAmount(nextAmount);

    if (Number(nextAmount || 0) >= 100 && months) {
      unlockStepActions("3");
    }
  };

  const updateMonths = (nextMonths) => {
    setMonths(nextMonths);

    if (amountValue >= 100 && nextMonths) {
      unlockStepActions("3");
    }
  };

  const markStepVisited = (step) => {
    setVisitedSteps((currentSteps) =>
      currentSteps.includes(step) ? currentSteps : [...currentSteps, step],
    );
  };

  const goToNextStep = (currentStep, nextStep) => {
    setCompletedSteps((currentSteps) =>
      currentSteps.includes(currentStep)
        ? currentSteps
        : [...currentSteps, currentStep],
    );
    markStepVisited(nextStep);
    setSelectedStep(nextStep);
  };

  const goToPreviousStep = (previousStep) => {
    markStepVisited(previousStep);
    setSelectedStep(previousStep);
  };

  const scrollToExperience = () => {
    window.requestAnimationFrame(() => {
      const target = document.getElementById("start-cards-title");

      if (!target) {
        return;
      }

      const startPosition = window.scrollY;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - 24;
      const distance = targetPosition - startPosition;
      const duration = 600;
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

  const startFlow = () => {
    markStepVisited("1");
    setSelectedStep("1");
    scrollToExperience();
  };

  const restartFlow = () => {
    setSelectedStep(null);
    setCompletedSteps([]);
    setVisitedSteps([]);
    setSelectedScenario(null);
    setHasCardPreview(false);
    setSelectedBankId("");
    setSelectedCardId("");
    setAmount("");
    setMonths(null);
    setUnlockedActionSteps([]);
    scrollToExperience();
  };

  return (
    <div className="mt-7" aria-labelledby="start-cards-title">
      <div className="max-w-5xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const isSelected = selectedStep === step.step;
            const isCompleted =
              completedSteps.includes(step.step) ||
              (step.step === "4" && selectedStep === "4");
            const isVisited = visitedSteps.includes(step.step);
            const isActiveOrUnfinishedVisited =
              isSelected || (isVisited && !isCompleted);

            return (
              <div
                className={`rounded-2xl border p-5 text-left shadow-sm transition duration-150 ${
                  isSelected
                    ? "border-[#181D27] bg-white"
                    : "border-slate-200 bg-white"
                }`}
                key={step.step}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : isActiveOrUnfinishedVisited
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step.step}
                  </span>

                  <h3 className="text-[15px] font-bold text-slate-950">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 ml-2 text-[13px] leading-5 text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="min-h-[34rem] max-w-4xl px-5">
        {showStart && (
          <StepContent id="step-start" variant="start">
            <button
              className="rounded-xl border-2 border-dashed border-slate-300 bg-transparent px-8 py-4 text-sm font-extrabold text-slate-400 transition hover:border-[#181D27] hover:text-[#181D27] focus:outline-none focus:ring-4 focus:ring-blue-100"
              onClick={startFlow}
              type="button"
            >
              Comenzar
            </button>
          </StepContent>
        )}

        {showScenarios && (
          <ScenarioCards
            onNext={() => goToNextStep("1", "2")}
            onSelectScenario={setSelectedScenario}
            selectedScenario={selectedScenario}
          />
        )}

        {showCardSelector && (
          <CardSelector
            hasPreview={hasCardPreview}
            onBack={() => goToPreviousStep("1")}
            onNext={() => goToNextStep("2", "3")}
            onSelectBank={setSelectedBankId}
            onSelectCard={updateSelectedCard}
            onShowPreview={() => {
              setHasCardPreview(true);
            }}
            selectedBankId={selectedBankId}
            selectedCardId={selectedCardId}
            showActions={showCardActions}
          />
        )}

        {showAmountInput && (
          <AmountInput
            amount={amount}
            months={months}
            onBack={() => goToPreviousStep("2")}
            onChangeAmount={updateAmount}
            onChangeMonths={updateMonths}
            onNext={() => goToNextStep("3", "4")}
            showActions={showAmountActions}
          />
        )}

        {showResults && (
          <ResultsChart
            amount={amount}
            months={months}
            onChangeAmount={updateAmount}
            onChangeMonths={updateMonths}
            onRestart={restartFlow}
            onSelectBank={setSelectedBankId}
            onSelectCard={updateSelectedCard}
            onSelectScenario={setSelectedScenario}
            onShowPreview={() => {
              setHasCardPreview(true);
            }}
            selectedBankId={selectedBankId}
            selectedCardId={selectedCardId}
            selectedScenario={selectedScenario}
          />
        )}
      </div>
    </div>
  );
}
