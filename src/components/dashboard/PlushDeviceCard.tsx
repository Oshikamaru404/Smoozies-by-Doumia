
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Battery, Wifi, Thermometer, Activity, HelpCircle, Volume2 } from "lucide-react";

interface PlushDeviceCardProps {
  name: string;
  status: "connected" | "disconnected";
  batteryLevel: number;
  lastSync: string;
  temperature?: number;
  isPaired?: boolean;
}

const PlushDeviceCard = ({
  name,
  status,
  batteryLevel,
  lastSync,
  temperature = 36.5,
  isPaired = true,
}: PlushDeviceCardProps) => {
  return (
    <Card className={cn(
      "shadow-soft transition-all duration-300 overflow-hidden",
      status === "connected" ? "border-primary/40" : "border-muted/50 opacity-80"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant={status === "connected" ? "default" : "outline"}>
            {status === "connected" ? "Connecté" : "Déconnecté"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground flex items-center">
              <Battery className="h-4 w-4 mr-1" />
              Batterie
            </span>
            <div className="flex items-center gap-2">
              <Progress 
                value={batteryLevel} 
                max={100} 
                className={cn(
                  "h-2 w-full",
                  batteryLevel > 30 
                    ? "bg-muted" 
                    : "bg-destructive/20"
                )}
              />
              <span className="text-sm font-medium min-w-[40px]">{batteryLevel}%</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground flex items-center">
              <Thermometer className="h-4 w-4 mr-1" />
              Température
            </span>
            <span className="font-medium">{temperature}°C</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground flex items-center">
              <Activity className="h-4 w-4 mr-1" />
              Activité
            </span>
            <span className="font-medium">Normal</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground flex items-center">
              <Volume2 className="h-4 w-4 mr-1" />
              Volume
            </span>
            <span className="font-medium">Moyen</span>
          </div>
        </div>

        <div className={cn(
          "text-sm flex flex-wrap gap-1 justify-between items-center p-2 rounded-md",
          status === "connected" 
            ? "bg-primary/10 text-primary" 
            : "bg-muted/50 text-muted-foreground"
        )}>
          <div className="flex items-center gap-1">
            <Wifi className="h-4 w-4" />
            <span>
              {status === "connected" 
                ? "Dernière synchronisation" 
                : "Déconnecté depuis"}
            </span>
          </div>
          <span className="font-medium">{lastSync}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" className="flex gap-1">
          <HelpCircle className="h-4 w-4" />
          Aide
        </Button>
        {isPaired ? (
          <Button variant="outline" size="sm">
            Configuration
          </Button>
        ) : (
          <Button size="sm">
            Associer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlushDeviceCard;
