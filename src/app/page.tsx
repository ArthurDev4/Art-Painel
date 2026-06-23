
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Check, CheckCircle2, MoreVertical, Info, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

// SVG para a cauda do balão estilo WhatsApp original
const MessageTail = ({ color = "white", side = "left" }: { color?: string, side?: "left" | "right" }) => (
  <svg 
    className={`absolute top-0 ${side === 'left' ? '-left-[8px]' : '-right-[8px]'} w-2.5 h-3 z-10`} 
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

const AudioPlayer = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current && duration) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, x / width));
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="flex items-center gap-3 py-1 pr-2 min-w-[240px]">
      <audio 
        ref={audioRef} 
        src={src} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <button 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-transparent hover:bg-black/5 flex items-center justify-center shrink-0 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 fill-[#667781] text-[#667781]" />
        ) : (
          <Play className="w-8 h-8 fill-[#667781] text-[#667781]" />
        )}
      </button>
      <div className="flex-1 flex flex-col gap-1 mt-1">
        <div 
          ref={progressBarRef}
          onClick={handleSeek}
          className="relative w-full h-1 bg-[#dcdcdc] rounded-full cursor-pointer overflow-visible group"
        >
          <div className="absolute -top-2 -bottom-2 left-0 right-0 z-0" />
          
          <div 
            className="absolute top-0 left-0 h-full bg-[#53bdeb] z-10" 
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#53bdeb] rounded-full shadow-sm z-20 transition-transform hover:scale-125"
            style={{ left: `${progress}%`, marginLeft: '-6px' }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#667781] font-medium">
            {isPlaying ? formatTime(currentTime) : formatTime(duration)}
          </span>
        </div>
      </div>
      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ml-1">
         <Image 
            src="https://picsum.photos/seed/elite-logo/100/100" 
            alt="Avatar" 
            width={40} 
            height={40} 
            className="object-cover"
         />
         <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#53bdeb] rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
         </div>
      </div>
    </div>
  );
};

const BotMessage = ({ content, time, showAvatar, isFirst, noPadding = false }: { content: React.ReactNode, time: string, showAvatar: boolean, isFirst?: boolean, noPadding?: boolean }) => (
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
          />
        </div>
      )}
    </div>
    <div className={`relative bg-white text-[#111b21] rounded-[12px] shadow-sm w-fit ${isFirst ? 'rounded-tl-none' : ''} ${noPadding ? 'p-0.5 overflow-hidden max-w-fit' : 'p-2.5 px-3.5 max-w-[85%]'}`}>
      {isFirst && <MessageTail color="white" side="left" />}
      <div className={`text-[14.5px] leading-relaxed font-normal`}>
        {content}
      </div>
      <div className={`text-[10px] text-[#667781] text-right font-normal ${noPadding ? 'absolute bottom-1.5 right-1.5 bg-black/30 text-white px-1.5 py-0.5 rounded backdrop-blur-sm' : 'mt-1'}`}>{time}</div>
    </div>
  </div>
);

const UserMessage = ({ content, time }: { content: string, time: string }) => (
  <div className="flex justify-end w-full mt-2 mb-3 animate-in fade-in slide-in-from-right-6 duration-300">
    <div className="relative bg-[#d9fdd3] text-[#111b21] py-2 px-3.5 rounded-[12px] rounded-tr-none shadow-sm min-w-[100px] max-w-[85%]">
      <MessageTail color="#d9fdd3" side="right" />
      <p className="text-[14.5px] font-normal leading-relaxed pr-2">
        {content}
      </p>
      <div className="flex items-center justify-end gap-0.5 mt-1">
        <span className="text-[10px] text-[#667781] font-normal">{time}</span>
        <div className="flex -space-x-1.5 ml-1">
          <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
          <Check className="w-3.5 h-3.5 text-[#53bdeb]" strokeWidth={3} />
        </div>
      </div>
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
  const [finalChoice, setFinalChoice] = useState<string | null>(null);
  const [finalAction, setFinalAction] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [afterChoiceVisible, setAfterChoiceVisible] = useState<number>(0);
  const [finalResponseVisible, setFinalResponseVisible] = useState<number>(0);
  const [feedbackResponseVisible, setFeedbackResponseVisible] = useState<number>(0);
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
  }, [visibleMessages, afterChoiceVisible, finalResponseVisible, feedbackResponseVisible, isTyping, userChoice, finalChoice, finalAction]);

  const handleChoice = async (choice: string) => {
    setUserChoice(choice);
    
    await new Promise(r => setTimeout(r, 1200));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsTyping(false);
    setAfterChoiceVisible(1);

    await new Promise(r => setTimeout(r, 1500));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsTyping(false);
    setAfterChoiceVisible(2);

    await new Promise(r => setTimeout(r, 1500));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsTyping(false);
    setAfterChoiceVisible(3);

    await new Promise(r => setTimeout(r, 5000));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsTyping(false);
    setAfterChoiceVisible(4);

    await new Promise(r => setTimeout(r, 1500));
    setAfterChoiceVisible(5);
  };

  const handleFinalChoice = async () => {
    setFinalChoice("Partir pros VALORES");
    
    await new Promise(r => setTimeout(r, 1000));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsTyping(false);
    setFinalResponseVisible(1);

    await new Promise(r => setTimeout(r, 2000));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsTyping(false);
    setFinalResponseVisible(2);

    await new Promise(r => setTimeout(r, 5000));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsTyping(false);
    setFinalResponseVisible(3);

    await new Promise(r => setTimeout(r, 3000));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsTyping(false);
    setFinalResponseVisible(4);

    await new Promise(r => setTimeout(r, 3000));
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsTyping(false);
    setFinalResponseVisible(5);
  };

  const handleFinalAction = async (action: string) => {
    setFinalAction(action);
    
    if (action === "Ver Feedbacks de Clientes") {
      await new Promise(r => setTimeout(r, 1200));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2500));
      setIsTyping(false);
      setFeedbackResponseVisible(1);

      await new Promise(r => setTimeout(r, 2000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsTyping(false);
      setFeedbackResponseVisible(2);

      await new Promise(r => setTimeout(r, 3000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2500));
      setIsTyping(false);
      setFeedbackResponseVisible(3);

      await new Promise(r => setTimeout(r, 5000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2500));
      setIsTyping(false);
      setFeedbackResponseVisible(4);

      await new Promise(r => setTimeout(r, 5000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsTyping(false);
      setFeedbackResponseVisible(5);

      await new Promise(r => setTimeout(r, 4000));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 2000));
      setIsTyping(false);
      setFeedbackResponseVisible(6);
    }
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden font-body bg-[#0b141a]">
      <header className="relative z-20 bg-[#202c33] text-white px-4 py-2 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
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
            <span className="text-[12px] text-emerald-500 leading-none font-medium">online</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-[#aebac1] hover:bg-white/5 rounded-full">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </header>

      <main ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-4 md:px-12 max-w-4xl mx-auto w-full flex flex-col scrollbar-hide pt-4 pb-24">
        
        <div className="flex justify-center my-3 animate-in fade-in duration-700">
          <span className="bg-[#182229]/80 backdrop-blur-sm text-[#8696a0] text-[11px] px-3 py-1.5 rounded-lg shadow-sm font-medium uppercase tracking-wider">
            Hoje
          </span>
        </div>

        <div className="flex justify-center mb-6 animate-in fade-in duration-500">
          <div className="bg-[#d1f4ff] text-[#111b21] p-3 rounded-xl flex items-start gap-3 shadow-sm border border-[#b3e5f2] max-w-[340px]">
            <span className="shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-[#00a884]" />
            </span>
            <p className="text-[13px] leading-tight font-normal">
              Essa empresa usa uma Conta Comercial verificada pela Meta.
            </p>
          </div>
        </div>

        <div className="w-full">
          {visibleMessages >= 1 && (
            <BotMessage 
              showAvatar={false}
              isFirst={true}
              time={currentTime}
              content={
                <>🎉 <strong>PARABÉNS!</strong> Você está entre os <strong>100 primeiros</strong> que garantiram seu cupom de desconto na compra do Painel Elite! 🔥</>
              }
            />
          )}

          {visibleMessages >= 2 && (
            <BotMessage 
              showAvatar={true}
              isFirst={false}
              time={currentTime}
              content={
                <>Para resgatar seu cupom, basta selecionar abaixo qual é o seu dispositivo:</>
              }
            />
          )}
        </div>

        {userChoice && (
          <UserMessage content={userChoice} time={currentTime} />
        )}

        <div className="w-full mt-2">
          {afterChoiceVisible >= 1 && (
            <BotMessage 
              showAvatar={false}
              isFirst={true}
              time={currentTime}
              content={
                <>✅ <strong>Seu CUPOM foi resgatado com sucesso!</strong></>
              }
            />
          )}

          {afterChoiceVisible >= 2 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              content={<>Agora, vou te enviar um vídeo demonstrativo. Assiste com atenção para ver o PAINEL na prática! 👇</>}
            />
          )}

          {afterChoiceVisible >= 3 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              noPadding={true}
              content={
                <div className="aspect-[4/3] w-[280px] sm:w-[320px] bg-black rounded-[8px] overflow-hidden">
                   <iframe 
                    src="https://fast.wistia.net/embed/iframe/k4y140j6p6?videoFoam=true" 
                    title="Vídeo Demonstrativo Elite Xiters"
                    allow="autoplay; fullscreen" 
                    frameBorder="0" 
                    scrolling="no" 
                    className="w-full h-full"
                  ></iframe>
                </div>
              }
            />
          )}

          {afterChoiceVisible >= 4 && (
            <BotMessage 
              showAvatar={true}
              isFirst={false}
              time={currentTime}
              content={<>E aí, gostou? Ficou interessado? Se sim, é só clicar no botão abaixo para conferir os valores. 👇</>}
            />
          )}
          
          {afterChoiceVisible >= 5 && !finalChoice && (
            <div className="flex justify-center py-6 animate-in fade-in zoom-in duration-500">
               <Button 
                onClick={handleFinalChoice}
                className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-10 py-4 h-auto font-bold text-[16px] shadow-xl transition-all hover:scale-105 active:scale-95 border-none"
              >
                Partir pros VALORES
              </Button>
            </div>
          )}

          {finalChoice && (
            <UserMessage content={finalChoice} time={currentTime} />
          )}

          {finalResponseVisible >= 1 && (
            <BotMessage 
              showAvatar={true}
              isFirst={true}
              time={currentTime}
              content={<>Calma, já estou enviado os valores... Enquanto isso escuta esse áudio, explico sobre tudo sobre a garantia 👇</>}
            />
          )}

          {finalResponseVisible >= 2 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              content={
                <AudioPlayer src="https://www.image2url.com/r2/default/audio/1782253041450-84297c4c-6212-4482-9b0a-c7ad7b781515.mp3" />
              }
            />
          )}

          {finalResponseVisible >= 3 && (
            <BotMessage 
              showAvatar={true}
              isFirst={false}
              time={currentTime}
              noPadding={true}
              content={
                <div className="w-[110px] sm:w-[137.5px] overflow-hidden rounded-[8px]">
                  <Image 
                    src="https://i.postimg.cc/VsnH2T4Y/painel-de-preco.png" 
                    alt="Tabela de Preços Elite Xiters" 
                    width={200} 
                    height={250} 
                    className="w-full h-auto object-contain block"
                  />
                </div>
              }
            />
          )}

          {finalResponseVisible >= 4 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              content={
                <AudioPlayer src="https://s3.gangx.site/typebot/public/workspaces/cm8ei2dg50000nyic8a0jkix8/typebots/s6sh4smbmkd061oggj42c0su/blocks/zz2pjkjbc29ov5v02dls3jg4?v=1746398877941" />
              }
            />
          )}

          {finalResponseVisible >= 5 && (
            <BotMessage 
              showAvatar={true}
              isFirst={false}
              time={currentTime}
              content={<>Seleciona uma opção abaixo para continuar: 👇</>}
            />
          )}

          {finalAction && (
            <UserMessage content={finalAction} time={currentTime} />
          )}

          {feedbackResponseVisible >= 1 && (
            <BotMessage 
              showAvatar={true}
              isFirst={true}
              time={currentTime}
              content={
                <AudioPlayer src="https://s3.gangx.site/typebot/public/workspaces/cm8ei2dg50000nyic8a0jkix8/typebots/s6sh4smbmkd061oggj42c0su/blocks/qhm16q1wxukyytvucb948myi?v=1746401150462" />
              }
            />
          )}

          {feedbackResponseVisible >= 2 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              content={
                <>Se LIGA nos <strong>FEEDBACKS</strong> de quem já comprou o PAINEL 👇</>
              }
            />
          )}

          {feedbackResponseVisible >= 3 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              noPadding={true}
              content={
                <div className="aspect-[9/20] w-[240px] bg-black rounded-[8px] overflow-hidden">
                   <iframe 
                    src="https://fast.wistia.net/embed/iframe/o3twreve7o?videoFoam=true" 
                    title="Feedback Clientes Elite Xiters 1"
                    allow="autoplay; fullscreen" 
                    frameBorder="0" 
                    scrolling="no" 
                    className="w-full h-full"
                  ></iframe>
                </div>
              }
            />
          )}

          {feedbackResponseVisible >= 4 && (
            <BotMessage 
              showAvatar={false}
              isFirst={false}
              time={currentTime}
              noPadding={true}
              content={
                <div className="aspect-[9/20] w-[240px] bg-black rounded-[8px] overflow-hidden">
                   <iframe 
                    src="https://fast.wistia.net/embed/iframe/f4aqsc4s1n?videoFoam=true" 
                    title="Feedback Clientes Elite Xiters 2"
                    allow="autoplay; fullscreen" 
                    frameBorder="0" 
                    scrolling="no" 
                    className="w-full h-full"
                  ></iframe>
                </div>
              }
            />
          )}

          {feedbackResponseVisible >= 5 && (
            <BotMessage 
              showAvatar={true}
              isFirst={false}
              time={currentTime}
              noPadding={true}
              content={
                <div className="w-[240px] overflow-hidden rounded-[8px]">
                  <Image 
                    src="https://i.postimg.cc/43mRk5FJ/cd6a1shc.png" 
                    alt="Chamada para Ação" 
                    width={240} 
                    height={100} 
                    className="w-full h-auto object-contain block"
                  />
                </div>
              }
            />
          )}

          {feedbackResponseVisible >= 6 && (
            <BotMessage 
              showAvatar={true}
              isFirst={false}
              time={currentTime}
              noPadding={true}
              content={
                <div className="w-[240px] overflow-hidden rounded-[8px]">
                  <Image 
                    src="https://i.postimg.cc/XNZKGytv/wu8qba15.png" 
                    alt="Chamada para Ação Extra" 
                    width={240} 
                    height={100} 
                    className="w-full h-auto object-contain block"
                  />
                </div>
              }
            />
          )}

          {isTyping && <TypingIndicator />}
        </div>

        {!userChoice && visibleMessages >= 2 && !isTyping && (
          <div className="w-full flex justify-end py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-wrap gap-2.5 justify-end max-w-[500px]">
              <Button 
                onClick={() => handleChoice("Celular ANDROID")}
                className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-3 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
              >
                Celular ANDROID
              </Button>
              <Button 
                onClick={() => handleChoice("Celular IOS")}
                className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-3 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
              >
                Celular IOS
              </Button>
              <Button 
                onClick={() => handleChoice("Emulador")}
                className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-3 h-auto font-medium text-[14px] shadow-lg transition-transform active:scale-95 border-none"
              >
                Emulador
              </Button>
            </div>
          </div>
        )}

        {finalResponseVisible >= 5 && !finalAction && !isTyping && (
          <div className="w-full flex justify-end py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-wrap gap-2.5 justify-end max-w-[500px]">
              <Button 
                onClick={() => handleFinalAction("Partir para o Pagamento")}
                className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-3 h-auto font-bold text-[14px] shadow-lg transition-transform active:scale-95 border-none"
              >
                Partir para o Pagamento
              </Button>
              <Button 
                onClick={() => handleFinalAction("Ver Feedbacks de Clientes")}
                className="bg-[#004d40] hover:bg-[#003d33] text-white rounded-full px-6 py-3 h-auto font-bold text-[14px] shadow-lg transition-transform active:scale-95 border-none"
              >
                Ver Feedbacks de Clientes
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
