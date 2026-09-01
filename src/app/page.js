import StartCards from "./components/StartCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto box-border w-full max-w-[1440px] py-8 sm:py-12 lg:py-16">
        <div className="mx-auto box-border w-full max-w-md px-4 sm:max-w-4xl sm:px-5 lg:max-w-[1440px] lg:px-12 xl:px-16">
          <div className="mb-4 mt-8 flex flex-col gap-2 sm:mb-6 sm:mt-11 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Calculadora de deuda
              </p>
              <h2
                className=" scroll-mt-6 text-3xl font-extrabold leading-tight text-slate-950 pr-5"
                id="start-cards-title"
              >
                ¿Cuanto cuesta un mal hábito de pago?
              </h2>
              
              <p className="mt-4">
                El costo de una deuda no depende solo de la tarjeta que eliges, 
                sino también de las decisiones que tomas al pagarla. 
                Simula distintos escenarios y descubre cómo las tasas, comisiones y <strong> tus hábitos de pago </strong> 
                afectan el costo final de tu deuda.
              </p>
            </div>
          </div>

          <StartCards />
        </div>
      </section>
    </main>
  );
}
