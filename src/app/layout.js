import "./globals.css";

export const metadata = {
  title: "Simulador de deuda TDC",
  description: "Prototipo de calculadora para simular deuda de tarjeta de cr\u00e9dito.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
