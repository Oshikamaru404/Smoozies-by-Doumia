
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Brain, Rocket, Alarm, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "conversation",
    title: "Conversation interactive",
    time: "Aujourd'hui, 15:30",
    duration: "12 min",
    status: "completed",
    emotion: "happy",
    icon: <MessageCircle className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "breathing",
    title: "Exercice de respiration",
    time: "Aujourd'hui, 13:45",
    duration: "3 min",
    status: "completed",
    emotion: "anxious",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "story",
    title: "Histoire interactive",
    time: "Aujourd'hui, 10:20",
    duration: "15 min",
    status: "completed",
    emotion: "happy",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "learning",
    title: "Apprentissage du calcul",
    time: "Hier, 16:30",
    duration: "8 min",
    status: "completed",
    emotion: "neutral",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    id: 5,
    type: "game",
    title: "Jeu psychomoteur",
    time: "Hier, 14:15",
    duration: "10 min",
    status: "completed",
    emotion: "happy",
    icon: <Rocket className="h-4 w-4" />,
  },
];

const scheduled = [
  {
    id: 101,
    type: "story",
    title: "Histoire du soir",
    time: "Aujourd'hui, 19:30",
    duration: "10 min",
    status: "scheduled",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 102,
    type: "learning",
    title: "Apprentissage des couleurs",
    time: "Demain, 10:00",
    duration: "15 min",
    status: "scheduled",
    icon: <Brain className="h-4 w-4" />,
  },
];

const getEmotionColor = (emotion?: string) => {
  switch (emotion) {
    case "happy":
      return "bg-emotion-happy/20 text-emotion-happy border-emotion-happy/30";
    case "anxious":
      return "bg-emotion-anxious/20 text-emotion-anxious border-emotion-anxious/30";
    case "sad":
      return "bg-emotion-sad/20 text-emotion-sad border-emotion-sad/30";
    case "angry":
      return "bg-emotion-angry/20 text-emotion-angry border-emotion-angry/30";
    default:
      return "bg-muted/30 text-muted-foreground border-muted/30";
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "conversation":
      return <MessageCircle className="h-4 w-4" />;
    case "breathing":
      return <Clock className="h-4 w-4" />;
    case "story":
      return <Calendar className="h-4 w-4" />;
    case "learning":
      return <Brain className="h-4 w-4" />;
    case "game":
      return <Rocket className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const RecentActivitiesCard = () => {
  return (
    <Card className="shadow-soft h-full">
      <CardHeader className="pb-3">
        <CardTitle>Activités</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <Tabs defaultValue="recent">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="recent">Récentes</TabsTrigger>
            <TabsTrigger value="scheduled">Programmées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4 min-h-[300px]">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg border border-muted/50 hover:border-muted transition-colors"
              >
                <div className={cn(
                  "p-2 rounded-full shrink-0",
                  getEmotionColor(activity.emotion)
                )}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium truncate">{activity.title}</h4>
                    <Badge variant="outline" className="shrink-0">
                      {activity.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-4 min-h-[300px]">
            {scheduled.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg border border-muted/50 hover:border-muted transition-colors"
              >
                <div className="p-2 bg-muted/30 rounded-full">
                  <Alarm className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium truncate">{activity.title}</h4>
                    <Badge variant="outline" className="shrink-0">
                      {activity.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <div className="p-3 rounded-lg border border-dashed border-muted flex items-center justify-center">
              <Button variant="ghost" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Programmer une activité
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-4">
        <Button variant="link" size="sm" className="text-muted-foreground ml-auto">
          Voir toutes les activités
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentActivitiesCard;
