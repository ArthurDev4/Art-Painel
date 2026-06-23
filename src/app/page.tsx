
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check, CheckCircle2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

// SVG para a cauda do balão estilo WhatsApp
const MessageTail = ({ color = "white", side = "left", position = "top" }: { color?: string, side?: "left" | "right", position?: "top" | "bottom" }) => (
  <svg 
    className={`absolute ${side === 'left' ? (position === 'top' ? 'top-0 -left-[8px]' : 'bottom-0 -left-[8px]') : (position === 'top' ? 'top-0 -right-[8px]' : 'bottom-0 -right-[8px]')} w-2.5 h-3.5`} 
    viewBox="0 0 10 14" 
    style={{ fill: color }}
  >
    {side === 'left' ? (
      <path d="M10 0 C 10 0 0 0 0 0 L 10 14 Z" />
    ) : (
      <path d="M0 0 C 0 0 10 0 10 0 L 0 14 Z" />
    )}
  </svg>
);

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-2 animate-in fade-in duration-300">
    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-white/10">
      <Image 
        src="https://picsum.photos/seed/elite-logo/100/100" 
        alt="Avatar" 
        width={32} 
        height={32} 
        className="object-cover"
      />
    </div>
    <div className="relative bg-white py-2.5 px-4 rounded-[12px] shadow-sm flex items-center justify-center min-w-[55px]">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#949494] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-[#949494] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-[#949494] rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [afterChoiceVisible, setAfterChoiceVisible] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsTyping(false);
      setVisibleMessages(1);

      await new Promise(r => setTimeout(r, 1200));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1800));
      setIsTyping(false);
      setVisibleMessages(2);
    };

    sequence();
  }, []);

  const handleChoice = async (choice: string) => {
    setUserChoice(choice);
    
    // Inicia sequência de resposta do bot após a escolha
    await new Promise(r => setTimeout(r, 1500));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsTyping(false);
    setAfterChoiceVisible(1);

    await new Promise(r => setTimeout(r, 1500));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsTyping(false);
    setAfterChoiceVisible(2);
  };

  return (
    <div className="flex flex-col h-screen whatsapp-bg overflow-hidden font-body selection:bg-[#00a884]/30 bg-[#0b141a]">
      {/* WhatsApp Header */}
      <header className="bg-[#202c33] text-white px-4 py-2.5 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/10">
            <Image 
              src="https://picsum.photos/seed/elite-logo/100/100" 
              alt="Elite Xiters" 
              width={40} 
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[15px] uppercase tracking-wide">ELITE XITERS</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 text-[#202c33]" />
            </div>
            <span className="text-[12px] text-emerald-500 leading-none">online</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-[#aebac1] hover:bg-white/5 rounded-full">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:px-12 space-y-4 max-w-4xl mx-auto w-full flex flex-col scrollbar-hide pt-6 pb-24">
        
        <div className="flex justify-center my-2 animate-in fade-in duration-700">
          <span className="bg-[#182229]/80 backdrop-blur-sm text-[#8696a0] text-[11px] px-3 py-1.5 rounded-lg shadow-sm font-medium uppercase tracking-wider">
            Hoje
          </span>
        </div>

        {/* Mensagens Iniciais */}
        <div className="space-y-1.5 w-full">
          {visibleMessages >= 1 && (
            <div className="flex items-start gap-2 animate-in fade-in slide-in-from-left-6 duration-500 mb-0.5">
              <div className="w-8 h-8 opacity-0"></div>
              <div className="relative bg-white text-[#111b21] p-2.5 px-4 rounded-[12px] rounded-tl-none shadow-sm flex-1 max-w-fit">
                <MessageTail color="white" side="left" position="top" />
                <div className="text-[14.5px] leading-relaxed">
                  🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥
                </div>
                <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{currentTime}</div>
              </div>
            </div>
          )}

          {visibleMessages >= 2 && (
            <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-6 duration-500">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-white/10">
                <Image 
                  src="https://picsum.photos/seed/elite-logo/100/100" 
                  alt="Avatar" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                />
              </div>
              <div className="relative bg-white text-[#111b21] p-2.5 px-4 rounded-[12px] shadow-sm flex-1 max-w-fit">
                <div className="text-[14.5px] leading-relaxed">
                  Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:
                </div>
                <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{currentTime}</div>
              </div>
            </div>
          )}
        </div>

        {/* Escolha do Usuário */}
        {userChoice && (
          <div className="flex justify-end w-full mt-4 animate-in fade-in slide-in-from-right-6 duration-300">
            <div className="relative bg-[#d9fdd3] text-[#111b21] py-2.5 px-4 rounded-[12px] rounded-tr-none shadow-sm min-w-[120px] max-w-[85%]">
              <MessageTail color="#d9fdd3" side="right" position="top" />
              <p className="text-[14.5px] font-normal leading-relaxed pr-2">
                {userChoice}
              </p>
              <div className="flex items-center justify-end gap-0.5 mt-1">
                <span className="text-[10.5px] text-[#667781] font-normal">{currentTime}</span>
                <div className="flex -space-x-1.5 ml-1">
                  <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
                  <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Respostas do Bot Após Escolha */}
        <div className="space-y-1.5 w-full">
          {afterChoiceVisible >= 1 && (
            <div className="flex items-start gap-2 animate-in fade-in slide-in-from-left-6 duration-500 mb-0.5">
              <div className="w-8 h-8 opacity-0"></div>
              <div className="relative bg-white text-[#111b21] p-2.5 px-4 rounded-[12px] rounded-tl-none shadow-sm flex-1 max-w-fit">
                <MessageTail color="white" side="left" position="top" />
                <div className="text-[14.5px] leading-relaxed">
                  ✅ <strong>Seu CUPOM foi resgatado com sucesso!</strong>
                </div>
                <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{currentTime}</div>
              </div>
            </div>
          )}

          {afterChoiceVisible >= 2 && (
            <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-6 duration-500">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-white/10">
                <Image 
                  src="https://picsum.photos/seed/elite-logo/100/100" 
                  alt="Avatar" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                />
              </div>
              <div className="relative bg-white text-[#111b21] p-2.5 px-4 rounded-[12px] shadow-sm flex-1 max-w-fit">
                <div className="text-[14.5px] leading-relaxed">
                  Agora, vou te enviar um vídeo demonstrativo. Assiste com atenção para ver o PAINEL na prática! 👇
                </div>
                <div className="text-[11px] text-[#667781] text-right mt-1 font-normal">{currentTime}</div>
              </div>
            </div>
          )}
          
          {isTyping && <TypingIndicator />}
        </div>

        {/* Botões de Opção */}
        {!userChoice && visibleMessages >= 2 && !isTyping && (
          <div className="flex flex-wrap gap-2 justify-center py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Button 
              onClick={() => handleChoice("Celular ANDROID")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-2.5 h-auto font-medium text-[14px] shadow-md transition-transform active:scale-95 border-none"
            >
              Celular ANDROID
            </Button>
            <Button 
              onClick={() => handleChoice("Celular IOS")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-2.5 h-auto font-medium text-[14px] shadow-md transition-transform active:scale-95 border-none"
            >
              Celular IOS
            </Button>
            <Button 
              onClick={() => handleChoice("Emulador")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-2.5 h-auto font-medium text-[14px] shadow-md transition-transform active:scale-95 border-none"
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
