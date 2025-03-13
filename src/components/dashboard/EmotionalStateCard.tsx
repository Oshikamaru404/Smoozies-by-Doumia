
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Smile, Clock, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const emotions = [
  { name: "Heureux", value: 65, color: "hsl(var(--emotion-happy))" },
  { name: "Calme", value: 20, color: "hsl(var(--emotion-calm))" },
  { name: "Triste", value: 10, color: "hsl(var(--emotion-sad))" },
  { name: "Anxieux", value: 5, color: "hsl(var(--emotion-anxious))" },
];

const weeklyData = [
  { name: "Lun", heureux: 40, calme: 30, triste: 20, anxieux: 10 },
  { name: "Mar", heureux: 55, calme: 25, triste: 15, anxieux: 5 },
  { name: "Mer", heureux: 60, calme: 25, triste: 10, anxieux: 5 },
  { name: "Jeu", heureux: 50, calme: 30, triste: 15, anxieux: 5 },
  { name: "Ven", heureux: 70, calme: 20, triste: 8, anxieux: 2 },
  { name: "Sam", heureux: 65, calme: 25, triste: 7, anxieux: 3 },
  { name: "Dim", heureux: 62, calme: 28, triste: 8, anxieux: 2 },
];

const monthlyData = [
  { name: "Sem 1", heureux: 50, calme: 30, triste: 15, anxieux: 5 },
  { name: "Sem 2", heureux: 55, calme: 25, triste: 15, anxieux: 5 },
  { name: "Sem 3", heureux: 65, calme: 25, triste: 8, anxieux: 2 },
  { name: "Sem 4", heureux: 60, calme: 30, triste: 8, anxieux: 2 },
];

const timeData = [
  { time: "08:00", emotion: 75 },
  { time: "10:00", emotion: 80 },
  { time: "12:00", emotion: 65 },
  { time: "14:00", emotion: 70 },
  { time: "16:00", emotion: 85 },
  { time: "18:00", emotion: 90 },
  { time: "20:00", emotion: 82 },
];

const EmotionalStateCard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('today');

  return (
    <Card className="shadow-soft overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>État émotionnel</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                {period === 'today' ? "Aujourd'hui" : 
                 period === 'week' ? "Cette semaine" : 
                 period === 'month' ? "Ce mois" : 
                 format(date || new Date(), "d MMMM yyyy", { locale: fr })}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Tabs defaultValue="quick">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="quick">Rapide</TabsTrigger>
                  <TabsTrigger value="calendar">Calendrier</TabsTrigger>
                </TabsList>
                <TabsContent value="quick" className="p-2 space-y-1">
                  <Button 
                    variant={period === 'today' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setPeriod('today')}
                  >
                    Aujourd'hui
                  </Button>
                  <Button 
                    variant={period === 'week' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setPeriod('week')}
                  >
                    Cette semaine
                  </Button>
                  <Button 
                    variant={period === 'month' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setPeriod('month')}
                  >
                    Ce mois
                  </Button>
                </TabsContent>
                <TabsContent value="calendar" className="p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="summary" className="gap-2">
              <Smile className="h-4 w-4" />
              <span className="hidden sm:inline-block">Résumé</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline-block">Journalier</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline-block">Tendances</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col bg-muted/30 p-3 rounded-lg">
                <span className="text-sm text-muted-foreground">Émotion dominante</span>
                <span className="text-2xl font-medium mt-1">Heureux</span>
                <span className="text-sm text-muted-foreground mt-1">65% du temps</span>
              </div>
              <div className="flex flex-col bg-muted/30 p-3 rounded-lg">
                <span className="text-sm text-muted-foreground">Stabilité émotionnelle</span>
                <span className="text-2xl font-medium mt-1">Élevée</span>
                <span className="text-sm text-muted-foreground mt-1">+ 8% par rapport à hier</span>
              </div>
            </div>
            
            <div className="h-64">
              <BarChart
                data={emotions}
                index="name"
                categories={["value"]}
                colors={["hsl(var(--primary))"]}
                valueFormatter={(value: number) => `${value}%`}
                layout="vertical"
                className="h-full mt-4"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="h-64">
              <LineChart
                data={timeData}
                index="time"
                categories={["emotion"]}
                colors={["hsl(var(--primary))"]}
                valueFormatter={(value: number) => `${value}%`}
                showLegend={false}
                showGridLines={false}
                className="h-full"
              />
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium">Meilleur moment</h4>
                <p className="text-sm text-muted-foreground">18h00 - Très heureux</p>
              </div>
              <div className="text-right">
                <h4 className="font-medium">Moment difficile</h4>
                <p className="text-sm text-muted-foreground">12h00 - Léger stress</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="h-64">
              <BarChart
                data={period === 'week' ? weeklyData : monthlyData}
                index="name"
                categories={["heureux", "calme", "triste", "anxieux"]}
                colors={[
                  "hsl(var(--emotion-happy))",
                  "hsl(var(--emotion-calm))",
                  "hsl(var(--emotion-sad))",
                  "hsl(var(--emotion-anxious))"
                ]}
                stack
                valueFormatter={(value: number) => `${value}%`}
                className="h-full"
              />
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium">Tendance globale</h4>
                <p className="text-sm text-muted-foreground">En amélioration (+5%)</p>
              </div>
              <div className="text-right">
                <h4 className="font-medium">Prochain objectif</h4>
                <p className="text-sm text-muted-foreground">Réduire l'anxiété (-2%)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end pt-0">
        <Button variant="link" size="sm" className="text-muted-foreground">
          Voir l'analyse détaillée
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmotionalStateCard;
