
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MoreVertical, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("16:45");

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const handleChoice = (choice: string) => {
    setUserChoice(choice);
  };

  return (
    <div className="flex flex-col h-screen whatsapp-bg overflow-hidden font-body selection:bg-[#00a884]/30">
      {/* WhatsApp Header */}
      <header className="bg-[#202c33] text-[#e9edef] px-4 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center overflow-hidden border border-white/5">
              <Image 
                src="https://picsum.photos/seed/elite/100/100" 
                alt="Elite Xiters" 
                width={40} 
                height={40}
                className="object-cover"
                data-ai-hint="gaming avatar"
              />
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-[#00a884] border-2 border-[#202c33] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-[16px] leading-tight">ELITE XITERS</span>
              <div className="bg-[#00a884] rounded-full p-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#202c33] fill-current" />
              </div>
            </div>
            <span className="text-[13px] text-[#00a884]">online</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-[#aebac1] hover:bg-white/5 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:px-12 space-y-3 max-w-4xl mx-auto w-full flex flex-col scrollbar-hide">
        {/* Date Divider */}
        <div className="flex justify-center my-4 animate-in fade-in zoom-in duration-500 fill-mode-both">
          <span className="bg-[#182229] text-[#8696a0] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm font-medium">
            Hoje
          </span>
        </div>

        {/* Business Info Message - Exactly like screenshot */}
        <div className="flex justify-center w-full mb-4 animate-in fade-in slide-in-from-top-4 duration-500 delay-200 fill-mode-both">
          <div className="bg-[#d1f4ff] text-[#111b21] p-3 px-4 rounded-[14px] flex items-center gap-3 shadow-sm border border-[#b3e5f2] max-w-[90%] md:max-w-md">
            <div className="bg-[#54656f] rounded-full p-0.5 shrink-0">
               <Info className="w-4 h-4 text-[#d1f4ff] fill-current" />
            </div>
            <p className="text-[13.5px] leading-snug">
              Essa empresa usa uma Conta Comercial verificada pela meta
            </p>
          </div>
        </div>

        {/* Bot Message Group */}
        <div className="space-y-1 w-full max-w-[90%] md:max-w-[70%]">
          {/* Message 1 */}
          <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-6 duration-500 delay-500 fill-mode-both">
            <div className="w-8 h-8 shrink-0 opacity-0"></div> {/* Spacer for alignment */}
            <div className="relative bg-white text-[#111b21] p-2.5 px-3 rounded-[12px] shadow-sm">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-path-tail-left-top"></div>
              <p className="text-[14.5px] leading-relaxed">
                🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥
              </p>
              <div className="text-[11px] text-[#667781] text-right mt-1.5 font-normal">{currentTime}</div>
            </div>
          </div>

          {/* Message 2 + Avatar */}
          <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-6 duration-500 delay-1500 fill-mode-both">
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 border border-white/10 shadow-md">
              <Image 
                src="https://picsum.photos/seed/elite-logo/100/100" 
                alt="Avatar" 
                width={36} 
                height={36} 
                className="object-cover"
                data-ai-hint="gaming logo"
              />
            </div>
            <div className="relative bg-white text-[#111b21] p-2.5 px-3 rounded-[12px] shadow-sm">
              <div className="absolute bottom-0 -left-1.5 w-3 h-3 bg-white clip-path-tail-left-bottom"></div>
              <p className="text-[14.5px] leading-relaxed">
                Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:
              </p>
              <div className="text-[11px] text-[#667781] text-right mt-1.5 font-normal">{currentTime}</div>
            </div>
          </div>
        </div>

        {/* User Response Message */}
        {userChoice && (
          <div className="flex justify-end w-full mt-4 animate-in fade-in slide-in-from-right-6 duration-300 fill-mode-both">
            <div className="relative bg-[#d9fdd3] text-[#111b21] p-2.5 px-3 rounded-[12px] shadow-sm max-w-[85%]">
              <div className="absolute top-0 -right-1.5 w-3 h-3 bg-[#d9fdd3] clip-path-tail-right-top"></div>
              <p className="text-[14.5px] font-medium leading-relaxed">
                {userChoice}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[11px] text-[#667781] font-normal">{currentTime}</span>
                <div className="flex">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500 text-transparent" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reply Buttons */}
        {!userChoice && (
          <div className="flex flex-col items-center gap-3 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-2500 fill-mode-both">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                onClick={() => handleChoice("Celular ANDROID")}
                className="bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] rounded-full px-8 py-6 h-auto font-bold text-[14px] shadow-xl transition-all active:scale-95 border border-[#ffffff10]"
              >
                Celular ANDROID
              </Button>
              <Button 
                onClick={() => handleChoice("Celular IOS")}
                className="bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] rounded-full px-8 py-6 h-auto font-bold text-[14px] shadow-xl transition-all active:scale-95 border border-[#ffffff10]"
              >
                Celular IOS
              </Button>
            </div>
            <Button 
              onClick={() => handleChoice("Emulador")}
              className="bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] rounded-full px-8 py-6 h-auto font-bold text-[14px] shadow-xl transition-all active:scale-95 border border-[#ffffff10] w-[200px]"
            >
              Emulador
            </Button>
          </div>
        )}
      </main>

      <style jsx>{`
        .clip-path-tail-left-top {
          clip-path: polygon(100% 0, 100% 100%, 0 0);
        }
        .clip-path-tail-left-bottom {
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
        }
        .clip-path-tail-right-top {
          clip-path: polygon(0 0, 0 100%, 100% 0);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
