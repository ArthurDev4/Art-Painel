
"use client";

import React from 'react';
import Image from 'next/image';
import { MoreVertical, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col h-screen whatsapp-bg overflow-hidden font-body">
      {/* WhatsApp Header */}
      <header className="bg-[#202c33] text-white px-4 py-3 flex items-center justify-between shadow-md z-10 animate-in fade-in duration-500">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#005c4b] flex items-center justify-center overflow-hidden border border-white/10">
              <Image 
                src="https://picsum.photos/seed/elite/100/100" 
                alt="Elite Xiters" 
                width={40} 
                height={40}
                className="object-cover"
                data-ai-hint="gaming avatar"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#202c33] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[15px]">ELITE XITERS</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 text-white" />
            </div>
            <span className="text-xs text-emerald-500">online</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 max-w-3xl mx-auto w-full">
        {/* Date Divider - Surge quase instantaneamente */}
        <div className="flex justify-center my-6 animate-in fade-in zoom-in duration-500 delay-[100ms] fill-mode-both">
          <span className="bg-[#182229] text-[#8696a0] text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium uppercase tracking-wider">
            Hoje
          </span>
        </div>

        {/* Business Info Message - Surge logo após a data */}
        <div className="flex justify-center max-w-sm mx-auto animate-in fade-in slide-in-from-top-4 duration-500 delay-[300ms] fill-mode-both">
          <div className="bg-[#d1f4ff] text-[#111b21] p-3 rounded-xl flex items-start gap-3 shadow-sm border border-[#b3e5f2]">
            <Info className="w-5 h-5 text-[#00a884] shrink-0 mt-0.5" />
            <p className="text-[13px] leading-tight">
              Essa empresa usa uma Conta Comercial verificada pela Meta.
            </p>
          </div>
        </div>

        {/* Message 1 - A primeira a ser enviada */}
        <div className="flex items-end gap-2 max-w-[85%] animate-in fade-in slide-in-from-left-6 duration-500 delay-[600ms] fill-mode-both">
          <div className="w-8 h-8 rounded-full bg-[#005c4b] hidden sm:flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
            <Image 
              src="https://picsum.photos/seed/elite/100/100" 
              alt="Avatar" 
              width={32} 
              height={32} 
              data-ai-hint="company logo"
            />
          </div>
          <div className="relative bg-white text-black p-3.5 rounded-2xl rounded-bl-none shadow-md">
            <div className="absolute bottom-0 -left-2 w-4 h-4 bg-white clip-path-tail-left"></div>
            <p className="text-[14.5px] font-medium leading-relaxed">
              🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥
            </p>
            <div className="text-[10px] text-[#667781] text-right mt-1 font-medium">16:45</div>
          </div>
        </div>

        {/* Message 2 - Enviada 1 segundo depois da primeira */}
        <div className="flex items-end gap-2 max-w-[85%] animate-in fade-in slide-in-from-left-6 duration-500 delay-[1600ms] fill-mode-both">
          <div className="w-8 h-8 rounded-full bg-[#005c4b] hidden sm:flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
            <Image 
              src="https://picsum.photos/seed/elite/100/100" 
              alt="Avatar" 
              width={32} 
              height={32} 
              data-ai-hint="company logo"
            />
          </div>
          <div className="bg-white text-black p-3.5 rounded-2xl rounded-bl-none shadow-md">
            <p className="text-[14.5px] font-medium leading-relaxed">
              Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:
            </p>
            <div className="text-[10px] text-[#667781] text-right mt-1 font-medium">16:45</div>
          </div>
        </div>

        {/* Quick Reply Buttons - Aparecem por último, após as mensagens */}
        <div className="flex flex-wrap gap-2 justify-center py-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[2400ms] fill-mode-both">
          <Button className="bg-[#005c4b] hover:bg-[#004d3f] text-white rounded-full px-6 py-6 h-auto font-bold text-sm shadow-lg transition-transform active:scale-95 border-none">
            Celular ANDROID
          </Button>
          <Button className="bg-[#005c4b] hover:bg-[#004d3f] text-white rounded-full px-6 py-6 h-auto font-bold text-sm shadow-lg transition-transform active:scale-95 border-none">
            Celular IOS
          </Button>
          <Button className="bg-[#005c4b] hover:bg-[#004d3f] text-white rounded-full px-6 py-6 h-auto font-bold text-sm shadow-lg transition-transform active:scale-95 border-none">
            Emulador
          </Button>
        </div>
      </main>

      <style jsx>{`
        .clip-path-tail-left {
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
        }
      `}</style>
    </div>
  );
}
