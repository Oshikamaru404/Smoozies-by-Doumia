import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Heart, Thermometer, Activity, User, Info, Mic, Volume2, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchSensorData, SensorData } from "@/services/apiService";
import { useChildrenStore } from "@/services/childrenService";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface HealthStatusCardProps {
  heartRate?: number;
  temperature?: number;
  sleepQuality?: number;
  lastUpdated?: string;
  refreshInterval?: number; // Intervalle de rafraîchissement en ms
}

const getHealthStatus = (metric: string, value: number): { status: string; color: string } => {
  switch (metric) {
    case 'heartRate':
      if (value < 60) return { status: "Bas", color: "text-amber-500" };
      if (value > 100) return { status: "Élevé", color: "text-red-500" };
      return { status: "Normal", color: "text-green-500" };
    case 'temperature':
      if (value < 36) return { status: "Basse", color: "text-blue-500" };
      if (value > 37.5) return { status: "Élevée", color: "text-red-500" };
      return { status: "Normale", color: "text-green-500" };
    case 'sleepQuality':
      if (value < 50) return { status: "Mauvais", color: "text-red-500" };
      if (value < 70) return { status: "Moyen", color: "text-amber-500" };
      return { status: "Bon", color: "text-green-500" };
    default:
      return { status: "N/A", color: "text-gray-500" };
  }
};

const HealthStatusCard = ({
  heartRate: initialHeartRate = 84,
  temperature: initialTemperature = 36.5,
  sleepQuality: initialSleepQuality = 85,
  lastUpdated: initialLastUpdated = "il y a 15 minutes",
  refreshInterval = 30000 // 30 secondes par défaut
}: HealthStatusCardProps) => {
  const { activeChild } = useChildrenStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [healthData, setHealthData] = useState<SensorData>({
    heartRate: initialHeartRate,
    temperature: initialTemperature,
    sleepQuality: initialSleepQuality
  });
  const [lastUpdated, setLastUpdated] = useState(initialLastUpdated);
  const [assistantOpen, setAssistantOpen] = useState(false);
  
  const {
    isListening,
    isProcessing,
    lastResponse,
    startListening,
    stopListening,
    sendTextInput,
    isInitialized
  } = useVoiceAssistant();

  const updateSensorData = async () => {
    if (!activeChild) return;
    
    setIsRefreshing(true);
    try {
      const data = await fetchSensorData(activeChild.id, activeChild.plushId);
      
      if (data.heartRate || data.temperature || data.sleepQuality) {
        setHealthData(prevData => ({ ...prevData, ...data }));
        setLastUpdated("à l'instant");
        
        if (data.timestamp) {
          const timestamp = new Date(data.timestamp);
          setLastUpdated(`${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (activeChild) {
      updateSensorData();
    }
  }, [activeChild]);

  useEffect(() => {
    if (!refreshInterval || refreshInterval <= 0) return;
    
    const intervalId = setInterval(() => {
      updateSensorData();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval, activeChild]);

  const heartRateStatus = getHealthStatus('heartRate', healthData.heartRate || 0);
  const temperatureStatus = getHealthStatus('temperature', healthData.temperature || 0);
  const sleepQualityStatus = getHealthStatus('sleepQuality', healthData.sleepQuality || 0);

  const getDailyReport = () => {
    if (!healthData.heartRate || !healthData.temperature || !healthData.sleepQuality) {
      return "Données insuffisantes pour générer un rapport.";
    }
    
    const allNormal = 
      heartRateStatus.status === "Normal" && 
      temperatureStatus.status === "Normale" && 
      sleepQualityStatus.status === "Bon";
      
    if (allNormal) {
      return `${activeChild?.name || 'L\'enfant'} a eu un sommeil de bonne qualité. Tous les paramètres vitaux sont dans les normes.`;
    } else if (temperatureStatus.status === "Élevée") {
      return `${activeChild?.name || 'L\'enfant'} présente une température légèrement élevée. Surveillez l'évolution.`;
    } else if (sleepQualityStatus.status !== "Bon") {
      return `${activeChild?.name || 'L\'enfant'} n'a pas bien dormi. Vérifiez les conditions de sommeil.`;
    } else {
      return `${activeChild?.name || 'L\'enfant'} présente quelques valeurs hors normes. Restez attentif.`;
    }
  };

  const handleOpenAssistant = () => {
    setAssistantOpen(true);
    if (!lastResponse) {
      sendTextInput(`Bonjour, comment va ${activeChild?.name || 'l\'enfant'} aujourd'hui?`);
    }
  };

  return (
    <Card className="shadow-soft h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>État physique</CardTitle>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Données captées par les senseurs de la peluche.</p>
                  <p>Dernière mise à jour: {lastUpdated}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8", isRefreshing && "animate-spin")}
              onClick={updateSensorData}
              disabled={isRefreshing}
            >
              {isRefreshing ? <Loader2 className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            
            <Dialog open={assistantOpen} onOpenChange={setAssistantOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-primary"
                  onClick={handleOpenAssistant}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Assistant vocal Pulche</DialogTitle>
                  <DialogDescription>
                    Communiquez avec la peluche de {activeChild?.name || "votre enfant"}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div className="bg-muted/30 p-4 rounded-lg mb-4 min-h-[100px] flex items-center justify-center">
                    {isProcessing ? (
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Traitement en cours...</p>
                      </div>
                    ) : lastResponse ? (
                      <p>{lastResponse}</p>
                    ) : (
                      <p className="text-muted-foreground text-center">
                        Utilisez le microphone pour parler avec l'assistant vocal
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button
                      variant={isListening ? "destructive" : "default"}
                      className="rounded-full h-16 w-16"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isProcessing || !isInitialized}
                    >
                      <Mic className={cn("h-6 w-6", isListening && "animate-pulse")} />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    {isListening 
                      ? "Écoute en cours... Cliquez pour arrêter" 
                      : "Cliquez sur le microphone pour parler"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={healthData.heartRate || 0}
                maxValue={120}
                text={`${healthData.heartRate}`}
                styles={buildStyles({
                  textSize: '30px',
                  pathColor: `hsl(var(--primary))`,
                  textColor: 'hsl(var(--foreground))',
                  trailColor: 'hsl(var(--muted))',
                })}
              />
            </div>
            <div className="flex items-center text-sm font-medium gap-1">
              <Heart className="h-4 w-4 text-primary" />
              BPM
            </div>
            <p className={cn("text-xs mt-1", heartRateStatus.color)}>
              {heartRateStatus.status}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={healthData.temperature || 0}
                maxValue={38}
                minValue={35}
                text={`${healthData.temperature}°`}
                styles={buildStyles({
                  textSize: '30px',
                  pathColor: (healthData.temperature || 0) > 37.5 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))',
                  textColor: 'hsl(var(--foreground))',
                  trailColor: 'hsl(var(--muted))',
                })}
              />
            </div>
            <div className="flex items-center text-sm font-medium gap-1">
              <Thermometer className="h-4 w-4 text-primary" />
              Temp.
            </div>
            <p className={cn("text-xs mt-1", temperatureStatus.color)}>
              {temperatureStatus.status}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={healthData.sleepQuality || 0}
                text={`${healthData.sleepQuality}%`}
                styles={buildStyles({
                  textSize: '28px',
                  pathColor: `hsl(var(--accent))`,
                  textColor: 'hsl(var(--foreground))',
                  trailColor: 'hsl(var(--muted))',
                })}
              />
            </div>
            <div className="flex items-center text-sm font-medium gap-1">
              <Activity className="h-4 w-4 text-accent" />
              Sommeil
            </div>
            <p className={cn("text-xs mt-1", sleepQualityStatus.color)}>
              {sleepQualityStatus.status}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Rapport quotidien</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {getDailyReport()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" size="sm" className="text-muted-foreground ml-auto">
          Voir l'historique complet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthStatusCard;
