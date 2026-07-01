
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'ART PAINEL | Atendimento',
  description: 'Fale com a ART PAINEL e garanta seu cupom de desconto exclusivo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="font-body bg-[#0b141a] text-foreground antialiased overflow-x-hidden" 
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
