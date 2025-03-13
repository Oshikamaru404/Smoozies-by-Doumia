
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { useChildrenStore } from "@/services/childrenService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Calendar as CalendarIcon, AlertCircle, Info } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import EmotionalStateCard from "@/components/dashboard/EmotionalStateCard";

const Analytics = () => {
  const { children, activeChild, setActiveChild } = useChildrenStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('week');

  // Si aucun enfant n'est actif mais qu'il y a des enfants disponibles
  useEffect(() => {
    if (!activeChild && children.length > 0) {
      setActiveChild(children[0]);
    }
  }, [children, activeChild, setActiveChild]);

  // Obtenir les données d'émotions pour le graphique
  const getEmotionsData = () => {
    if (!activeChild?.emotionalState?.collected) {
      return [];
    }

    return activeChild.emotionalState.data?.history || [];
  };

  // Formater les données pour le graphique historique
  const formatHistoryData = () => {
    const historyData = getEmotionsData();
    
    return historyData.map(day => ({
      date: day.date,
      heureux: day.emotions.happy,
      calme: day.emotions.calm,
      triste: day.emotions.sad,
      anxieux: day.emotions.anxious
    }));
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Analyse émotionnelle</h1>
          
          {children.length > 0 && (
            <div className="mt-4 md:mt-0">
              <Select 
                defaultValue={activeChild?.id.toString()} 
                onValueChange={(value) => {
                  const child = children.find(c => c.id.toString() === value);
                  if (child) setActiveChild(child);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sélectionner un enfant" />
                </SelectTrigger>
                <SelectContent>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id.toString()}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {activeChild ? (
          <>
            {activeChild.emotionalState?.collected ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Historique des émotions</CardTitle>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            {period === 'week' ? "Cette semaine" : "Ce mois"}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2" align="end">
                          <div className="flex flex-col space-y-1">
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
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={formatHistoryData()}
                        index="date"
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

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Résumé de la période</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Émotion</TableHead>
                            <TableHead>Moyenne</TableHead>
                            <TableHead>Tendance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Heureux</TableCell>
                            <TableCell>{activeChild.emotionalState.data?.dominant === 'Heureux' ? 'Dominante' : '45%'}</TableCell>
                            <TableCell className="text-green-600">↑ +5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Calme</TableCell>
                            <TableCell>{activeChild.emotionalState.data?.dominant === 'Calme' ? 'Dominante' : '30%'}</TableCell>
                            <TableCell className="text-blue-600">→ Stable</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Triste</TableCell>
                            <TableCell>10%</TableCell>
                            <TableCell className="text-red-600">↓ -2%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Anxieux</TableCell>
                            <TableCell>5%</TableCell>
                            <TableCell className="text-amber-600">↓ -1%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Détection émotionnelle</CardTitle>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            {format(date || new Date(), "d MMMM yyyy", { locale: fr })}
                            <CalendarIcon className="h-4 w-4 ml-1" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <LineChart
                        data={activeChild.emotionalState.data?.dayAnalysis || []}
                        index="time"
                        categories={["emotion"]}
                        colors={["hsl(var(--primary))"]}
                        valueFormatter={(value: number) => `${value}%`}
                        showLegend={false}
                        className="h-full"
                      />
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">Moment le plus positif</h4>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="text-lg font-semibold">18h00</p>
                          <p className="text-sm text-muted-foreground">Joie intense</p>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">Moment le moins positif</h4>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="text-lg font-semibold">12h00</p>
                          <p className="text-sm text-muted-foreground">Légère anxiété</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Analyse contextuelle</h4>
                        <p className="text-muted-foreground">
                          {activeChild.name} a montré une tendance émotionnelle positive tout au long de la journée, 
                          avec un pic à 18h00 après des activités ludiques. Une légère baisse a été observée 
                          vers midi, coïncidant avec l'heure du repas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-soft">
                <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
                  <div className="text-center max-w-md">
                    <h3 className="text-lg font-medium mb-2">Données émotionnelles non disponibles</h3>
                    <p className="text-muted-foreground mb-4">
                      Les capteurs n'ont pas encore collecté de données émotionnelles pour {activeChild.name}.
                      Connectez la peluche pour commencer la collecte.
                    </p>
                    <Button variant="outline" size="sm">
                      Comment synchroniser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="shadow-soft">
            <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center max-w-md">
                <h3 className="text-lg font-medium mb-2">Aucun enfant sélectionné</h3>
                <p className="text-muted-foreground mb-4">
                  Veuillez ajouter un enfant ou sélectionner un profil existant pour voir l'analyse émotionnelle.
                </p>
                <Button variant="default">
                  Ajouter un enfant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
};

export default Analytics;
