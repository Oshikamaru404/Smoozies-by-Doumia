
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Lightbulb, 
  Clock, 
  Rocket,
  Music,
  Sun,
  Moon, 
  BrainCircuit,
  Play,
  Heart,
  Zap,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Action {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: "default" | "calm" | "learn" | "play";
  duration?: string;
  isNew?: boolean;
}

const quickActions: Action[] = [
  {
    id: "bedtime-story",
    title: "Histoire du soir",
    description: "Une histoire apaisante pour préparer au sommeil",
    icon: <Book className="h-5 w-5" />,
    variant: "calm",
    duration: "10 min",
  },
  {
    id: "breathing",
    title: "Exercice de respiration",
    description: "Exercice guidé de respiration pour se calmer",
    icon: <Clock className="h-5 w-5" />,
    variant: "calm",
    duration: "3 min",
  },
  {
    id: "math-game",
    title: "Jeu de mathématiques",
    description: "Apprendre les bases du calcul de façon ludique",
    icon: <BrainCircuit className="h-5 w-5" />,
    variant: "learn",
    duration: "5 min",
  },
  {
    id: "interactive-story",
    title: "Histoire interactive",
    description: "Une aventure où votre enfant fait des choix",
    icon: <Lightbulb className="h-5 w-5" />,
    variant: "play",
    duration: "15 min",
    isNew: true,
  },
];

const recommendedActions: Action[] = [
  {
    id: "calming-music",
    title: "Musique apaisante",
    description: "Mélodies douces pour moments de stress",
    icon: <Music className="h-5 w-5" />,
    variant: "calm",
    duration: "10 min",
  },
  {
    id: "morning-routine",
    title: "Routine du matin",
    description: "Commencer la journée avec énergie et joie",
    icon: <Sun className="h-5 w-5" />,
    variant: "default",
    duration: "5 min",
    isNew: true,
  },
];

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "calm":
      return "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800";
    case "learn":
      return "bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800";
    case "play":
      return "bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800";
    default:
      return "bg-muted/50 hover:bg-muted/70 border-muted";
  }
};

const getIconStyles = (variant: string) => {
  switch (variant) {
    case "calm":
      return "text-blue-600 dark:text-blue-400";
    case "learn":
      return "text-purple-600 dark:text-purple-400";
    case "play":
      return "text-green-600 dark:text-green-400";
    default:
      return "text-foreground";
  }
};

const ActionButton = ({ action }: { action: Action }) => {
  return (
    <div className={cn(
      "relative p-4 rounded-lg border transition-all",
      getVariantStyles(action.variant)
    )}>
      {action.isNew && (
        <Badge 
          variant="default" 
          className="absolute -top-2 -right-2 text-xs px-1.5 h-5"
        >
          Nouveau
        </Badge>
      )}
      
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-full",
          getVariantStyles(action.variant)
        )}>
          <span className={getIconStyles(action.variant)}>
            {action.icon}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">{action.title}</h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {action.description}
          </p>
          
          <div className="flex justify-between items-center mt-3">
            {action.duration && (
              <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {action.duration}
              </span>
            )}
            
            <Button size="sm" className="ml-auto gap-1">
              <Play className="h-4 w-4" />
              Lancer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionsCard = () => {
  return (
    <Card className="shadow-soft h-full">
      <CardHeader className="pb-3">
        <CardTitle>Actions rapides</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="quick">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="quick">Rapides</TabsTrigger>
            <TabsTrigger value="recommended">Recommandées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <ActionButton key={action.id} action={action} />
              ))}
            </div>
            
            <div className="flex items-center justify-center p-4 border border-dashed rounded-lg">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Créer une action personnalisée
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="space-y-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 mb-4">
              <div className="flex gap-3">
                <div className="shrink-0 p-2 bg-primary/20 rounded-full">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Recommandations intelligentes</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Basées sur les habitudes et les besoins émotionnels récents.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedActions.map((action) => (
                <ActionButton key={action.id} action={action} />
              ))}
            </div>
            
            <div className="flex gap-4 items-center p-4 rounded-lg border bg-muted/30">
              <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/20">
                <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Heure du coucher</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Dans 2 heures. Préparez une routine du soir.
                </p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Moon className="h-4 w-4 mr-2" />
                Préparer
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
