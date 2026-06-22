import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Twitter, Linkedin, Youtube, Music, Instagram, ArrowRight, Settings, BarChart3, Wand2, MessageCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const LINKS = [
  { name: 'WhatsApp Elite', icon: MessageCircle, url: '/chat', color: 'text-emerald-400', internal: true },
  { name: 'GitHub', icon: Github, url: 'https://github.com', color: 'text-white' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'text-blue-400' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'text-cyan-400' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com', color: 'text-red-500' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'text-pink-500' },
];

export default function Home() {
  const profileImg = PlaceHolderImages.find(img => img.id === 'profile-avatar');

  return (
    <main className="min-h-screen relative flex flex-col items-center pt-20 pb-20 px-4 md:px-0">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      {/* Floating Action Menu */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 glass-card rounded-full z-50">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full">Home</Button>
        </Link>
        <Link href="/editor">
          <Button variant="ghost" size="sm" className="rounded-full gap-2">
            <Settings className="w-4 h-4" /> Edit Profile
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="rounded-full gap-2">
            <BarChart3 className="w-4 h-4" /> Insights
          </Button>
        </Link>
      </nav>

      {/* Profile Header */}
      <header className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-border shadow-2xl">
            <Image
              src={profileImg?.imageUrl || ''}
              alt="Profile"
              width={112}
              height={112}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2 text-center">Alex Rivera</h1>
        <p className="text-muted-foreground text-lg mb-4 text-center max-w-md px-4">
          Product Designer & Creative Engineer. Crafting digital experiences that pulse with energy and purpose.
        </p>
        <div className="flex gap-4">
          <Link href="/chat">
            <Button className="rounded-full px-6 font-medium gap-2 bg-emerald-600 hover:bg-emerald-700">
              <MessageCircle className="w-4 h-4" /> Ver Novo Chat
            </Button>
          </Link>
        </div>
      </header>

      {/* Link Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {LINKS.map((link, i) => (
          <Card 
            key={link.name} 
            className="group glass-card glow-hover border-white/5 overflow-hidden transition-all hover:-translate-y-1"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <Link href={link.url} target={link.internal ? undefined : "_blank"} className="block p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-secondary ${link.color}`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="text-xl font-headline font-semibold mb-1">{link.name}</h3>
              <p className="text-sm text-muted-foreground">Acesse meu {link.name} oficial.</p>
            </Link>
          </Card>
        ))}
      </section>

      <footer className="mt-32 text-center text-muted-foreground text-sm">
        <p>© 2024 PulseFolio. Built for high-impact professionals.</p>
      </footer>
    </main>
  );
}
