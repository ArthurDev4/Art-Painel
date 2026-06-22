
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Wand2, Palette, Layout, Loader2, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProfessionalBio } from '@/ai/flows/generate-professional-bio';

export default function EditorPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState('');
  const [achievements, setAchievements] = useState('');
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [accentColor, setAccentColor] = useState('#4C82FB');
  const [glowIntensity, setGlowIntensity] = useState([50]);

  const handleGenerateBio = async () => {
    if (!goals || !achievements) {
      toast({
        title: "Missing Information",
        description: "Please provide both goals and achievements to generate a bio.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateProfessionalBio({
        professionalGoals: goals,
        achievements: achievements,
      });
      setGeneratedBios(result.bios);
      toast({
        title: "Success",
        description: "Professional bios generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate bios. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Bio copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-headline font-bold">Customize PulseFolio</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">Preview</Button>
            <Button className="rounded-full">Save Changes</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <Tabs defaultValue="bio" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-full mb-6">
              <TabsTrigger value="bio" className="rounded-full">AI Bio</TabsTrigger>
              <TabsTrigger value="visuals" className="rounded-full">Visuals</TabsTrigger>
              <TabsTrigger value="layout" className="rounded-full">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="bio">
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-headline">Smart Bio Assistant</CardTitle>
                  <CardDescription>Let AI craft your high-impact professional story.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Professional Goals</Label>
                    <Textarea 
                      placeholder="e.g. Scaling Series B startups, mastering distributed systems..." 
                      className="bg-secondary/50 border-white/5 min-h-[100px]"
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Key Achievements</Label>
                    <Textarea 
                      placeholder="e.g. Managed team of 10, launched 3 profitable products..." 
                      className="bg-secondary/50 border-white/5 min-h-[100px]"
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full rounded-full gap-2 font-bold bg-primary hover:bg-primary/90" 
                    onClick={handleGenerateBio}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    Generate Bios
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visuals">
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-headline">Live Customization</CardTitle>
                  <CardDescription>Adjust your branding in real-time.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Accent Color</Label>
                    <div className="flex gap-2">
                      {['#4C82FB', '#68DAFD', '#F472B6', '#10B981', '#F59E0B'].map((color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${accentColor === color ? 'border-white' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setAccentColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Glow Effects</Label>
                      <Switch defaultChecked />
                    </div>
                    <Slider 
                      value={glowIntensity} 
                      onValueChange={setGlowIntensity} 
                      max={100} 
                      step={1} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Corner Radius</Label>
                    <Slider defaultValue={[12]} max={24} step={2} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout">
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="font-headline">Grid Pattern</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-secondary rounded-xl flex items-center justify-center border-2 border-primary cursor-pointer">
                      <Layout className="w-8 h-8 opacity-50" />
                    </div>
                    <div className="aspect-square bg-secondary/50 rounded-xl flex items-center justify-center border border-white/5 hover:border-white/20 cursor-pointer">
                      <Palette className="w-8 h-8 opacity-20" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Select your primary layout structure for the hub grid.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Results/Preview Column */}
        <div className="lg:col-span-8">
          {generatedBios.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                <Check className="text-accent" /> Generated Bio Options
              </h2>
              <div className="grid gap-4">
                {generatedBios.map((bio, index) => (
                  <Card key={index} className="glass-card border-white/5 group hover:border-primary/40 transition-all">
                    <CardContent className="p-6">
                      <p className="text-lg leading-relaxed mb-4">{bio}</p>
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(bio)}
                        >
                          <Copy className="w-4 h-4" /> Copy Bio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl bg-secondary/20">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Wand2 className="w-10 h-10 text-primary opacity-50" />
              </div>
              <h2 className="text-2xl font-headline font-bold mb-2">No Bios Generated Yet</h2>
              <p className="text-muted-foreground max-w-sm">
                Enter your professional goals and achievements on the left and our Smart Assistant will craft high-impact bios for you.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
