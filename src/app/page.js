import StartCards from "./components/StartCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 lg:px-12 lg:py-16 xl:px-16 ">
        
        <div className="max-w-[640px]">
          <h1 className="mb-5 text-[40px] font-extrabold leading-[1.08] tracking-normal text-slate-950 sm:text-5xl">
            Calcula el valor de tu tarjeta de crédito
          </h1>
          <p className="text-lg font-medium leading-7 text-slate-600">
            Mantener una tarjeta de crédito puede ser costoso. Juega con los escenarios de pago y aprende cómo un hábito puede salvarte la deuda. 
          </p>
          
          <p className="mt-4 text-lg font-medium leading-7 text-slate-600">
            Funciona así: el escenario es el hábito que te ayuda a pagar tu deuda. Elígelo sabiamente. El monto y tiempo determinan cuanto piensas pagar por mes. ¡Fácil!. 
          </p>

          <p className="mt-4 text-lg font-medium leading-7 text-slate-600">
            ¿Eres nuevo o llevas años en el oficio?. Descubre cuánto pagas por el uso de tu tarjeta al final de cada escenario y
            reval&uacute;a tus hábitos financieros.
          </p>

          
        </div>
       

        <div className="mt-11 mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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
