
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ArrowLeft, TrendingUp, Users, MousePointer2, Clock, Globe, ArrowUpRight } from 'lucide-react';

const VISIT_DATA = [
  { name: 'Mon', visits: 120, clicks: 80 },
  { name: 'Tue', visits: 190, clicks: 110 },
  { name: 'Wed', visits: 150, clicks: 95 },
  { name: 'Thu', visits: 280, clicks: 210 },
  { name: 'Fri', visits: 220, clicks: 160 },
  { name: 'Sat', visits: 310, clicks: 240 },
  { name: 'Sun', visits: 450, clicks: 380 },
];

const PLATFORM_DATA = [
  { name: 'GitHub', value: 45 },
  { name: 'Twitter', value: 30 },
  { name: 'LinkedIn', value: 20 },
  { name: 'Others', value: 5 },
];

export default function DashboardPage() {
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
            <h1 className="text-xl font-headline font-bold">Visitor Insights</h1>
          </div>
          <Button variant="outline" className="rounded-full gap-2">
            Download CSV <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">Unique Visits</p>
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-headline font-bold">1,724</h3>
                <span className="text-xs text-emerald-400 font-medium">+12.5%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">Link Clicks</p>
                <MousePointer2 className="w-4 h-4 text-accent" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-headline font-bold">1,075</h3>
                <span className="text-xs text-emerald-400 font-medium">+24.2%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">Avg. Time</p>
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-headline font-bold">4m 32s</h3>
                <span className="text-xs text-rose-400 font-medium">-2.1%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">Conversion</p>
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-headline font-bold">62.3%</h3>
                <span className="text-xs text-emerald-400 font-medium">+5.4%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-8 glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Traffic Overview</CardTitle>
                <CardDescription>Visualizing your profile reach over the last 7 days.</CardDescription>
              </div>
              <Tabs defaultValue="week">
                <TabsList className="rounded-full">
                  <TabsTrigger value="day" className="rounded-full">D</TabsTrigger>
                  <TabsTrigger value="week" className="rounded-full">W</TabsTrigger>
                  <TabsTrigger value="month" className="rounded-full">M</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VISIT_DATA}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorVisits)" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="hsl(var(--accent))" 
                    fillOpacity={0} 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 glass-card border-white/5">
            <CardHeader>
              <CardTitle className="font-headline">Referral Sources</CardTitle>
              <CardDescription>Where your audience is coming from.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PLATFORM_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--foreground))', fontSize: 14, fontWeight: 500}}
                    width={80}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                  />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                    {PLATFORM_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <Globe className="w-4 h-4 text-muted-foreground" />
                     <span>Direct Traffic</span>
                   </div>
                   <span className="font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <Users className="w-4 h-4 text-muted-foreground" />
                     <span>Social Referrals</span>
                   </div>
                   <span className="font-medium">52%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
