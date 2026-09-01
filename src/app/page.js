import StartCards from "./components/StartCards";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      <section className="box-border mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-16 xl:px-16 ">
        
        <div className="max-w-[640px]">
          <h1 className="mb-4 text-[40px] font-extrabold leading-[1.08] tracking-normal text-slate-950 sm:mb-5 sm:text-5xl">
            Calcula el valor de tu tarjeta de crédito
          </h1>
          <p className="text-lg font-medium leading-7 text-slate-600">
            Mantener una tarjeta de crédito puede ser costoso. Juega con los escenarios de pago y aprende cómo un hábito puede salvarte la deuda. 
          </p>
          
          <p className="mt-3 text-lg font-medium leading-7 text-slate-600 sm:mt-4">
            Funciona así: el escenario es el hábito que te ayuda a pagar tu deuda. Elígelo sabiamente. El monto y tiempo determinan cuanto piensas pagar por mes. ¡Fácil!. 
          </p>

          <p className="mt-3 text-lg font-medium leading-7 text-slate-600 sm:mt-4">
            ¿Eres nuevo o llevas años en el oficio?. Descubre cuánto pagas por el uso de tu tarjeta al final de cada escenario y
            reval&uacute;a tus hábitos financieros.
          </p>

          
        </div>
       

        <div className="mb-4 mt-8 flex flex-col gap-2 sm:mb-6 sm:mt-11 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Comienza ya
            </p>
            <h2
              className="mt-1 scroll-mt-6 text-3xl font-extrabold leading-tight text-slate-950"
              id="start-cards-title"
            >
              Simula en cuatro pasos
            </h2>
          </div>
        </div>

        <StartCards />
      </section>
    </main>
  );
}
