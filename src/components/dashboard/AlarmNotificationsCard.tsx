
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Niveau de stress détecté",
    description: "Un niveau de stress modéré a été détecté à 14:30. Exercice de respiration suggéré.",
    time: "14:45, aujourd'hui",
    status: "resolved",
    priority: "medium"
  },
  {
    id: 2,
    type: "notification",
    title: "Rapport quotidien disponible",
    description: "Le rapport quotidien d'Emma est maintenant disponible.",
    time: "08:00, aujourd'hui",
    status: "unread",
    priority: "low"
  },
  {
    id: 3,
    type: "alert",
    title: "Activation du mode calme",
    description: "Le mode calme a été activé suite à des signes d'agitation.",
    time: "Hier, 19:25",
    status: "resolved",
    priority: "medium"
  },
];

const AlarmNotificationsCard = () => {
  const [activeNotifications, setActiveNotifications] = useState(notifications);

  const handleDismiss = (id: number) => {
    setActiveNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleMarkAsRead = (id: number) => {
    setActiveNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: "read" } 
          : notification
      )
    );
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30";
      case "low":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted/50 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="shadow-soft h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertes & Notifications
          </CardTitle>
          <Badge variant="outline" className="px-2 py-0.5 h-5 text-xs">
            {activeNotifications.filter(n => n.status === "unread").length} non lues
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium">Aucune notification</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tout est calme pour le moment
            </p>
          </div>
        ) : (
          activeNotifications.map((notification) => (
            <Alert
              key={notification.id}
              className={cn(
                "flex items-start gap-3 p-3 border",
                notification.status === "unread" && "border-l-4",
                notification.type === "alert" 
                  ? getPriorityStyles(notification.priority)
                  : "bg-muted/30 border-muted",
                notification.status === "read" && "opacity-70",
              )}
            >
              <div className="shrink-0">
                {notification.type === "alert" ? (
                  <AlertCircle className="h-5 w-5" />
                ) : (
                  <Bell className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">
                    {notification.title}
                  </h4>
                  <div className="flex gap-1 shrink-0">
                    {notification.status === "unread" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => handleDismiss(notification.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <AlertDescription className="text-sm mt-1">
                  {notification.description}
                </AlertDescription>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {notification.time}
                </div>
              </div>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AlarmNotificationsCard;
