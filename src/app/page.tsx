
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MoreVertical, CheckCircle2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TypingIndicator = () => (
  <div className="flex items-end gap-1.5 animate-in fade-in duration-300 mb-2">
    {/* Avatar circular com fundo preto igual ao print */}
    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-md">
      <Image 
        src="https://picsum.photos/seed/elite-logo/100/100" 
        alt="Avatar" 
        width={36} 
        height={36} 
        className="object-cover"
        data-ai-hint="gaming logo"
      />
    </div>
    {/* Balão de digitação branco e arredondado */}
    <div className="relative bg-white p-2.5 px-4 rounded-[22px] rounded-bl-none shadow-sm flex items-center justify-center h-[36px] min-w-[55px]">
      {/* Cauda precisa do balão */}
      <div className="absolute bottom-0 -left-1.5 w-3 h-3 bg-white clip-path-tail-typing"></div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 bg-[#949494] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-[#949494] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-[#949494] rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

    const sequence = async () => {
      // Pequeno delay inicial
      await new Promise(r => setTimeout(r, 800));
      
      // Digitando para a primeira mensagem
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2000));
      setIsTyping(false);
      setVisibleMessages(1);

      await new Promise(r => setTimeout(r, 1200));

      // Digitando para a segunda mensagem
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2500));
      setIsTyping(false);
      setVisibleMessages(2);
    };

    sequence();
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
              <span className="font-medium text-[16px] leading-tight uppercase">ELITE XITERS</span>
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
      <main className="flex-1 overflow-y-auto p-4 md:px-12 space-y-4 max-w-4xl mx-auto w-full flex flex-col scrollbar-hide pb-10">
        {/* Date Divider */}
        <div className="flex justify-center my-2 animate-in fade-in zoom-in duration-500 fill-mode-both">
          <span className="bg-[#182229] text-[#8696a0] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm font-medium">
            Hoje
          </span>
        </div>

        {/* Business Info Message */}
        <div className="flex justify-center w-full mb-4 animate-in fade-in slide-in-from-top-4 duration-500 fill-mode-both">
          <div className="bg-[#d1f4ff] text-[#111b21] p-3 px-4 rounded-[14px] flex items-center gap-3 shadow-sm border border-[#b3e5f2] max-w-[95%] md:max-w-md">
            <div className="bg-[#54656f] rounded-full w-5 h-5 flex items-center justify-center shrink-0">
               <span className="text-[#d1f4ff] font-bold text-[13px] leading-none mb-0.5">!</span>
            </div>
            <p className="text-[13.5px] leading-snug">
              Essa empresa usa uma Conta Comercial verificada pela meta
            </p>
          </div>
        </div>

        {/* Bot Message Group */}
        <div className="space-y-1.5 w-full max-w-[95%] md:max-w-[75%]">
          {/* Typing for Message 1 */}
          {isTyping && visibleMessages === 0 && <TypingIndicator />}

          {/* Message 1 */}
          {visibleMessages >= 1 && (
            <div className="flex items-start gap-2 animate-in fade-in slide-in-from-left-6 duration-500 fill-mode-both">
              <div className="w-9 h-9 shrink-0 opacity-0"></div>
              <div className="relative bg-white text-[#111b21] p-3 px-4 rounded-[16px] rounded-tl-none shadow-sm flex-1">
                <div className="absolute top-0 -left-2 w-3 h-3 bg-white clip-path-tail-left-top"></div>
                <p className="text-[14.5px] leading-relaxed">
                  🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥
                </p>
                <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{currentTime}</div>
              </div>
            </div>
          )}

          {/* Typing for Message 2 */}
          {isTyping && visibleMessages === 1 && <TypingIndicator />}

          {/* Message 2 + Avatar */}
          {visibleMessages >= 2 && (
            <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-6 duration-500 fill-mode-both">
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                <Image 
                  src="https://picsum.photos/seed/elite-logo/100/100" 
                  alt="Avatar" 
                  width={36} 
                  height={36} 
                  className="object-cover"
                />
              </div>
              <div className="relative bg-white text-[#111b21] p-3 px-4 rounded-[16px] rounded-bl-none shadow-sm flex-1">
                <div className="absolute bottom-0 -left-2 w-3 h-3 bg-white clip-path-tail-left-bottom"></div>
                <p className="text-[14.5px] leading-relaxed">
                  Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:
                </p>
                <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{currentTime}</div>
              </div>
            </div>
          )}
        </div>

        {/* User Response Message */}
        {userChoice && (
          <div className="flex justify-end w-full mt-4 animate-in fade-in slide-in-from-right-6 duration-300 fill-mode-both">
            <div className="relative bg-[#d9fdd3] text-[#111b21] py-2.5 px-4 rounded-[16px] rounded-tr-none shadow-sm min-w-[120px] max-w-[85%]">
              <div className="absolute top-0 -right-2 w-3 h-3 bg-[#d9fdd3] clip-path-tail-right-top"></div>
              <p className="text-[15px] font-normal leading-relaxed pr-2">
                {userChoice}
              </p>
              <div className="flex items-center justify-end gap-0.5 mt-1">
                <span className="text-[10.5px] text-[#667781] font-normal">{currentTime}</span>
                <div className="flex -space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
                  <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reply Buttons */}
        {!userChoice && visibleMessages >= 2 && !isTyping && (
          <div className="flex flex-wrap gap-2 justify-center py-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <Button 
              onClick={() => handleChoice("Celular ANDROID")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-5 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Celular ANDROID
            </Button>
            <Button 
              onClick={() => handleChoice("Celular IOS")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-5 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Celular IOS
            </Button>
            <Button 
              onClick={() => handleChoice("Emulador")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-5 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
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
        .clip-path-tail-typing {
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
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
