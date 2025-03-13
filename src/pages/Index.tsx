
import Navbar from "@/components/layout/Navbar";
import EmotionalStateCard from "@/components/dashboard/EmotionalStateCard";
import PlushDeviceCard from "@/components/dashboard/PlushDeviceCard";
import RecentActivitiesCard from "@/components/dashboard/RecentActivitiesCard";
import HealthStatusCard from "@/components/dashboard/HealthStatusCard";
import AlarmNotificationsCard from "@/components/dashboard/AlarmNotificationsCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Settings, Users } from "lucide-react";
import { useState } from "react";

const children = [
  {
    id: 1,
    name: "Emma",
    age: 5,
    plushName: "PulcheCare Bunny",
    status: "connected" as const,
    batteryLevel: 78,
    lastSync: "il y a 5 min",
  },
  {
    id: 2,
    name: "Thomas",
    age: 7,
    plushName: "PulcheCare Rex",
    status: "disconnected" as const,
    batteryLevel: 15,
    lastSync: "il y a 3 heures",
  },
];

const Dashboard = () => {
  const [activeChild, setActiveChild] = useState(children[0]);
  
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 pt-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            Tableau de bord
          </h1>
          
          <Tabs defaultValue="child-1" className="space-y-4 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-transparent p-0 h-auto space-x-2">
                {children.map((child) => (
                  <TabsTrigger
                    key={child.id}
                    value={`child-${child.id}`}
                    onClick={() => setActiveChild(child)}
                    className="rounded-lg px-4 py-2 h-auto data-[state=active]:shadow-sm transition-all"
                  >
                    {child.name}
                    {child.status === "connected" && (
                      <span className="w-2 h-2 bg-primary rounded-full ml-2" />
                    )}
                  </TabsTrigger>
                ))}
                <Button variant="ghost" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Ajouter</span>
                </Button>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Partage familial</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {children.map((child) => (
              <TabsContent key={child.id} value={`child-${child.id}`} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2 bg-gradient-to-br from-primary/5 to-accent/5 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-bold">{child.name}</h2>
                          <p className="text-muted-foreground">
                            {child.age} ans
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                            Dernière analyse: aujourd'hui
                          </Badge>
                          <Badge variant="outline" className="bg-accent/10 hover:bg-accent/20">
                            État: Heureux
                          </Badge>
                        </div>
                      </div>
                      
                      <Alert className="bg-card">
                        <Bell className="h-4 w-4" />
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                          {child.name} a été calme aujourd'hui. Aucune alerte détectée.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                  
                  <PlushDeviceCard
                    name={child.plushName}
                    status={child.status}
                    batteryLevel={child.batteryLevel}
                    lastSync={child.lastSync}
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EmotionalStateCard />
                  <HealthStatusCard />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <QuickActionsCard />
                  <RecentActivitiesCard />
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <AlarmNotificationsCard />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </header>
      </main>
    </div>
  );
};

export default Dashboard;
