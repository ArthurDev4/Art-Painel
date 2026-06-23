
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Componente para a cauda do balão (estilo WhatsApp)
const MessageTail = ({ color = "white", side = "left" }: { color?: string, side?: "left" | "right" }) => (
  <svg 
    className={`absolute ${side === 'left' ? 'bottom-0 -left-[7px]' : 'top-0 -right-[7px]'} w-2.5 h-3.5`} 
    viewBox="0 0 10 14" 
    style={{ fill: color }}
  >
    {side === 'left' ? (
      <path d="M10 0 L10 14 L0 14 Z" />
    ) : (
      <path d="M0 0 L0 14 L10 0 Z" />
    )}
  </svg>
);

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-2 animate-in fade-in duration-300">
    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-black/5">
      <Image 
        src="https://picsum.photos/seed/elite-logo/100/100" 
        alt="Avatar" 
        width={32} 
        height={32} 
        className="object-cover"
      />
    </div>
    <div className="relative bg-white py-3 px-4 rounded-[18px] rounded-bl-none shadow-sm flex items-center justify-center min-w-[55px] min-h-[40px]">
      <MessageTail color="white" side="left" />
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#949494] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-[#949494] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-[#949494] rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
);

const BotMessage = ({ content, time }: { content: React.ReactNode, time: string }) => (
  <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-6 duration-500 fill-mode-both">
    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
      <Image 
        src="https://picsum.photos/seed/elite-logo/100/100" 
        alt="Avatar" 
        width={32} 
        height={32} 
        className="object-cover"
      />
    </div>
    <div className="relative bg-white text-[#111b21] p-3 px-4 rounded-[18px] rounded-bl-none shadow-sm flex-1 max-w-fit">
      <MessageTail color="white" side="left" />
      <div className="text-[14.5px] leading-relaxed pr-2">
        {content}
      </div>
      <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{time}</div>
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
      await new Promise(r => setTimeout(r, 800));
      
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1800));
      setIsTyping(false);
      setVisibleMessages(1);

      await new Promise(r => setTimeout(r, 1000));

      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2200));
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
      <main className="flex-1 overflow-y-auto p-4 md:px-12 space-y-4 max-w-4xl mx-auto w-full flex flex-col scrollbar-hide pt-10 pb-10">
        
        <div className="flex justify-center my-6 animate-in fade-in duration-700">
          <span className="bg-[#182229]/70 backdrop-blur-sm text-[#8696a0] text-[11px] px-3 py-1.5 rounded-lg shadow-sm font-medium uppercase tracking-wider">
            Hoje
          </span>
        </div>

        <div className="space-y-4 w-full max-w-[95%] md:max-w-[75%]">
          {isTyping && visibleMessages === 0 && <TypingIndicator />}

          {/* Mensagem 1 */}
          {visibleMessages >= 1 && (
            <BotMessage 
              time={currentTime}
              content={
                <>🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥</>
              }
            />
          )}

          {isTyping && visibleMessages === 1 && <TypingIndicator />}

          {/* Mensagem 2 */}
          {visibleMessages >= 2 && (
            <BotMessage 
              time={currentTime}
              content="Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:"
            />
          )}
        </div>

        {userChoice && (
          <div className="flex justify-end w-full mt-4 animate-in fade-in slide-in-from-right-6 duration-300 fill-mode-both">
            <div className="relative bg-[#d9fdd3] text-[#111b21] py-2.5 px-4 rounded-[18px] rounded-tr-none shadow-sm min-w-[120px] max-w-[85%]">
              <MessageTail color="#d9fdd3" side="right" />
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

        {!userChoice && visibleMessages >= 2 && !isTyping && (
          <div className="flex flex-wrap gap-2 justify-center py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <Button 
              onClick={() => handleChoice("Celular ANDROID")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-8 py-5 h-auto font-medium text-[15px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Celular ANDROID
            </Button>
            <Button 
              onClick={() => handleChoice("Celular IOS")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-8 py-5 h-auto font-medium text-[15px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Celular IOS
            </Button>
            <Button 
              onClick={() => handleChoice("Emulador")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-8 py-5 h-auto font-medium text-[15px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Emulador
            </Button>
          </div>
        )}
      </main>

      <style jsx>{`
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
