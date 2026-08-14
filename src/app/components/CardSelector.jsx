import { useState } from "react";

import StepContent from "./StepContent";

export const banks = [
  {
    id: "bbva",
    name: "BBVA",
    color: "#1464A5",
    cards: [
      {
        id: "bbva-azul",
        name: "Azul Digital",
        initials: "BB",
        cat: "44.9%",
        fee: "$850",
      },
      {
        id: "bbva-oro",
        name: "Oro",
        initials: "BB",
        cat: "52.1%",
        fee: "$1,150",
      },
      {
        id: "bbva-platinum",
        name: "Platinum",
        initials: "BB",
        cat: "57.6%",
        fee: "$2,410",
      },
    ],
  },
  {
    id: "banamex",
    name: "Banamex",
    color: "#00539B",
    cards: [
      {
        id: "banamex-costco",
        name: "Costco",
        initials: "BX",
        cat: "38.2%",
        fee: "Sin anualidad",
      },
      {
        id: "banamex-clasica",
        name: "Cl\u00e1sica",
        initials: "BX",
        cat: "45.8%",
        fee: "$782",
      },
    ],
  },
  {
    id: "hsbc",
    name: "HSBC",
    color: "#DB0011",
    cards: [
      {
        id: "hsbc-viva",
        name: "Viva Zero",
        initials: "HS",
        cat: "55.6%",
        fee: "$500",
      },
      {
        id: "hsbc-2now",
        name: "2Now",
        initials: "HS",
        cat: "48.9%",
        fee: "$0",
      },
    ],
  },
];

export const getBankById = (bankId) =>
  banks.find((bank) => bank.id === bankId) || banks[0];

const defaultSelectorColor = "#1464A5";

function BankIcon({ color }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 10.5h16M6.5 10.5v7M10.2 10.5v7M13.8 10.5v7M17.5 10.5v7M5 19.5h14M12 4.5 4.8 8.2h14.4L12 4.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CardIcon({ color }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4.5 7.5h15A1.5 1.5 0 0 1 21 9v7.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5V9a1.5 1.5 0 0 1 1.5-1.5ZM3 11h18M7 15h3"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SideDropdown({
  icon: Icon,
  shadowDirection = "down",
  onToggle,
  options,
  placeholder = "-- seleccionar --",
  value,
}) {
  const selectedOption = options.find((option) => option.value === value);
  const isSelected = Boolean(selectedOption);
  const hoverShadow =
    shadowDirection === "up"
      ? "hover:shadow-[0_-12px_26px_rgba(15,23,42,0.10)]"
      : "hover:shadow-[0_14px_30px_rgba(15,23,42,0.14)]";

  return (
    <div className="relative">
      <button
        className={`flex w-full items-center justify-between gap-3 rounded-xl border py-3 pl-5 pr-4 text-left text-sm font-extrabold shadow-sm outline-none transition duration-150 hover:-translate-y-0.5 ${hoverShadow} focus:ring-4 focus:ring-blue-100 ${
          isSelected
            ? "border-[#181D27] bg-[#181D27] text-white shadow-[0_14px_30px_rgba(24,29,39,0.22)] hover:bg-[#181D27]"
            : "border-slate-100 bg-white text-slate-950 hover:bg-[#F3F4F6] focus:border-blue-100"
        }`}
        onClick={onToggle}
        type="button"
      >
        <span className={isSelected ? "text-white" : "text-slate-500"}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="shrink-0">
          <Icon color={isSelected ? "#FFFFFF" : undefined} />
        </span>
      </button>
    </div>
  );
}

function SideListPanel({ listTitle, onSelect, options, origin, value }) {
  if (!listTitle) {
    return <div className="hidden lg:block" />;
  }

  const pointerPosition =
    origin === "bank" ? "top-7" : origin === "card" ? "bottom-7" : "top-1/2";

  return (
    <div className="relative h-full max-h-full rounded-xl border border-slate-200 p-1 shadow-sm">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -left-1.5 ${pointerPosition} hidden h-3 w-3 rotate-45 border-b border-l border-slate-200 bg-white shadow-[-6px_6px_14px_rgba(15,23,42,0.08)] lg:block`}
      />
      <div className="flex h-full max-h-full flex-wrap content-start gap-1 overflow-y-auto pr-1">
        <span className="px-3 py-2 text-left text-sm font-bold text-slate-500">
          {listTitle}
        </span>
        {options.map((option) => (
          <button
            className={`group relative rounded-lg px-3 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              option.value === value
                ? "text-[#181D27] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:bg-[#181D27]/30 after:shadow-[0_0_8px_rgba(24,29,39,0.22)]"
                : "text-slate-950"
            }`}
            key={option.value}
            onClick={() => onSelect(option.value)}
            type="button"
          >
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#181D27]/0 blur-[10px] transition duration-150 group-hover:bg-[#181D27]/15" />
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CardSelector({
  hasPreview,
  onBack,
  onNext,
  onSelectBank,
  onSelectCard,
  onShowPreview,
  selectedBankId,
  selectedCardId,
  showActions,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const selectedCard =
    selectedBank?.cards.find((card) => card.id === selectedCardId) || null;
  const hasSelection = hasPreview && selectedBank && selectedCard;

  const updateBank = (bankId) => {
    if (!bankId) {
      onSelectBank("");
      onSelectCard("");
      return;
    }

    const nextBank = getBankById(bankId);

    onShowPreview();
    onSelectBank(nextBank.id);
    onSelectCard("");
    setOpenDropdown(null);
  };

  const updateCard = (cardId) => {
    if (!cardId) {
      onSelectCard("");
      return;
    }

    onShowPreview();
    onSelectCard(cardId);
    setOpenDropdown(null);
  };

  const bankOptions = banks.map((bank) => ({
    label: bank.name,
    value: bank.id,
  }));
  const cardOptions =
    selectedBank?.cards.map((card) => ({
      label: `${selectedBank.name} - ${card.name}`,
      value: card.id,
    })) || [];
  const activeOptions = openDropdown === "bank" ? bankOptions : cardOptions;
  const activeTitle =
    openDropdown === "bank" ? "Banco" : openDropdown === "card" ? "Tarjeta" : "";
  const activeValue = openDropdown === "bank" ? selectedBankId : selectedCardId;
  const activeSelect = openDropdown === "bank" ? updateBank : updateCard;

  return (
    <StepContent
      actions={
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
          {hasSelection ? (
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
          )}
        </div>
      }
      id="step-tarjeta"
      variant="cardSelector"
    >
      <div className="flex min-h-16 items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-18 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-extrabold text-white"
            style={{
              backgroundColor: hasSelection ? selectedBank.color : "#cbd5e1",
            }}
          >
            {hasSelection ? selectedCard.initials : "--"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-950">
              {hasSelection ? `${selectedBank.name} - ${selectedCard.name}` : "--"}
            </p>
            <p className="text-xs font-medium text-slate-500">
              {hasSelection
                ? `CAT ${selectedCard.cat} - Anualidad ${selectedCard.fee}`
                : "--"}
            </p>
          </div>
        </div>
      </div>
      <div className="grid min-h-16 content-center gap-2">
        <SideDropdown
          icon={({ color }) => <BankIcon color={color || defaultSelectorColor} />}
          onToggle={() =>
            setOpenDropdown((current) => (current === "bank" ? null : "bank"))
          }
          options={bankOptions}
          shadowDirection="up"
          value={selectedBankId}
        />

        <SideDropdown
          icon={({ color }) => <CardIcon color={color || defaultSelectorColor} />}
          onToggle={() =>
            setOpenDropdown((current) => (current === "card" ? null : "card"))
          }
          options={cardOptions}
          value={selectedCardId}
        />
      </div>
      <SideListPanel
        listTitle={activeTitle}
        onSelect={activeSelect}
        options={activeOptions}
        origin={openDropdown}
        value={activeValue}
      />
    </StepContent>
  );
}
