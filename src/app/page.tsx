"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Check, CheckCircle2, MoreVertical, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

// SVG para a cauda do balão estilo WhatsApp original
const MessageTail = ({ color = "white", side = "left" }: { color?: string, side?: "left" | "right" }) => (
  <svg 
    className={`absolute top-0 ${side === 'left' ? '-left-[8px]' : '-right-[8px]'} w-2.5 h-3`} 
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

const BotMessage = ({ content, time, showAvatar }: { content: React.ReactNode, time: string, showAvatar: boolean }) => (
  <div className="flex items-start gap-2 mb-3 animate-in fade-in slide-in-from-left-4 duration-500">
    <div className="w-8 h-8 shrink-0 flex items-center justify-center mt-auto mb-1">
      {showAvatar && (
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-sm border border-white/10">
          <Image 
            src="https://picsum.photos/seed/elite-logo/100/100" 
            alt="Avatar" 
            width={32} 
            height={32} 
            className="object-cover"
            data-ai-hint="company logo"
          />
        </div>
      )}
    </div>
    <div className={`relative bg-white text-[#111b21] p-2.5 px-3.5 rounded-[12px] shadow-sm flex-1 max-w-[85%] rounded-tl-none`}>
      <MessageTail color="white" side="left" />
      <div className="text-[14.5px] leading-relaxed font-normal">
        {content}
      </div>
      <div className="text-[10px] text-[#667781] text-right mt-1 font-normal">{time}</div>
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-2 mb-3 animate-in fade-in duration-300">
    <div className="w-8 h-8 shrink-0 flex items-center justify-center mt-auto mb-1">
      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-sm border border-white/10">
        <Image 
          src="https://picsum.photos/seed/elite-logo/100/100" 
          alt="Avatar" 
          width={32} 
          height={32} 
          className="object-cover"
          data-ai-hint="company logo"
        />
      </div>
    </div>
    <div className="relative bg-white py-3 px-4 rounded-[12px] rounded-tl-none shadow-sm flex items-center justify-center min-w-[55px]">
      <MessageTail color="white" side="left" />
      <div className="flex gap-1.5">
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsTyping(false);
      setVisibleMessages(1);

      await new Promise(r => setTimeout(r, 1000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1800));
      setIsTyping(false);
      setVisibleMessages(2);
    };

    sequence();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, afterChoiceVisible, isTyping, userChoice]);

  const handleChoice = async (choice: string) => {
    setUserChoice(choice);
    
    await new Promise(r => setTimeout(r, 1200));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsTyping(false);
    setAfterChoiceVisible(1);

    await new Promise(r => setTimeout(r, 1500));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2200));
    setIsTyping(false);
    setAfterChoiceVisible(2);
  };

  return (
    <div className="whatsapp-bg flex flex-col h-screen overflow-hidden font-body selection:bg-[#00a884]/30">
      {/* WhatsApp Header - Mantido Conforme Solicitado */}
      <header className="relative z-10 bg-[#202c33] text-white px-4 py-2 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
            <Image 
              src="https://picsum.photos/seed/elite-logo/100/100" 
              alt="Elite Xiters" 
              width={40} 
              height={40}
              className="object-cover"
              data-ai-hint="company logo"
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

      <main ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-4 md:px-12 max-w-4xl mx-auto w-full flex flex-col scrollbar-hide pt-4 pb-24">
        
        {/* Date Divider */}
        <div className="flex justify-center my-3 animate-in fade-in duration-700">
          <span className="bg-[#182229]/80 backdrop-blur-sm text-[#8696a0] text-[11px] px-3 py-1.5 rounded-lg shadow-sm font-medium uppercase tracking-wider">
            Hoje
          </span>
        </div>

        {/* Business Info Banner */}
        <div className="flex justify-center mb-6 animate-in fade-in duration-500">
          <div className="bg-[#d1f4ff] text-[#111b21] p-3 rounded-xl flex items-start gap-3 shadow-sm border border-[#b3e5f2] max-w-[340px]">
            <Info className="w-5 h-5 text-[#00a884] shrink-0 mt-0.5" />
            <p className="text-[13px] leading-tight font-normal">
              Essa empresa usa uma Conta Comercial verificada pela Meta.
            </p>
          </div>
        </div>

        {/* Bot Messages Section */}
        <div className="w-full">
          {visibleMessages >= 1 && (
            <BotMessage 
              showAvatar={true}
              time={currentTime}
              content={
                <>🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥</>
              }
            />
          )}

          {visibleMessages >= 2 && (
            <BotMessage 
              showAvatar={true}
              time={currentTime}
              content={<>Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:</>}
            />
          )}
        </div>

        {/* User Choice Section */}
        {userChoice && (
          <div className="flex justify-end w-full mt-2 mb-3 animate-in fade-in slide-in-from-right-6 duration-300">
            <div className="relative bg-[#d9fdd3] text-[#111b21] py-2 px-3.5 rounded-[12px] rounded-tr-none shadow-sm min-w-[100px] max-w-[85%]">
              <MessageTail color="#d9fdd3" side="right" />
              <p className="text-[14.5px] font-normal leading-relaxed pr-2">
                {userChoice}
              </p>
              <div className="flex items-center justify-end gap-0.5 mt-1">
                <span className="text-[10px] text-[#667781] font-normal">{currentTime}</span>
                <div className="flex -space-x-1.5 ml-1">
                  <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
                  <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post-Choice Bot Section */}
        <div className="w-full mt-2">
          {afterChoiceVisible >= 1 && (
            <BotMessage 
              showAvatar={true}
              time={currentTime}
              content={
                <>✅ <strong>Seu CUPOM foi resgatado com sucesso!</strong></>
              }
            />
          )}

          {afterChoiceVisible >= 2 && (
            <BotMessage 
              showAvatar={true}
              time={currentTime}
              content={<>Agora, vou te enviar um vídeo demonstrativo. Assiste com atenção para ver o PAINEL na prática! 👇</>}
            />
          )}
          
          {isTyping && <TypingIndicator />}
        </div>

        {/* Device Selection Section */}
        {!userChoice && visibleMessages >= 2 && !isTyping && (
          <div className="flex flex-wrap gap-2.5 justify-center py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Button 
              onClick={() => handleChoice("Celular ANDROID")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-8 py-3.5 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Celular ANDROID
            </Button>
            <Button 
              onClick={() => handleChoice("Celular IOS")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-8 py-3.5 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Celular IOS
            </Button>
            <Button 
              onClick={() => handleChoice("Emulador")}
              className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-8 py-3.5 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
            >
              Emulador
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
