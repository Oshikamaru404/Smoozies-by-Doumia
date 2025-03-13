
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Heart, Thermometer, Activity, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthStatusCardProps {
  heartRate?: number;
  temperature?: number;
  sleepQuality?: number;
  lastUpdated?: string;
}

const HealthStatusCard = ({
  heartRate = 84,
  temperature = 36.5,
  sleepQuality = 85,
  lastUpdated = "il y a 15 minutes"
}: HealthStatusCardProps) => {
  return (
    <Card className="shadow-soft h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>État physique</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={heartRate}
                maxValue={120}
                text={`${heartRate}`}
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
            <p className="text-xs text-muted-foreground mt-1">Normal</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={temperature}
                maxValue={38}
                minValue={35}
                text={`${temperature}°`}
                styles={buildStyles({
                  textSize: '30px',
                  pathColor: temperature > 37.5 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))',
                  textColor: 'hsl(var(--foreground))',
                  trailColor: 'hsl(var(--muted))',
                })}
              />
            </div>
            <div className="flex items-center text-sm font-medium gap-1">
              <Thermometer className="h-4 w-4 text-primary" />
              Temp.
            </div>
            <p className="text-xs text-muted-foreground mt-1">Normal</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={sleepQuality}
                text={`${sleepQuality}%`}
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
            <p className="text-xs text-muted-foreground mt-1">Bon</p>
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
                Emma a eu un sommeil de bonne qualité la nuit dernière. Tous les paramètres vitaux sont dans les normes.
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
