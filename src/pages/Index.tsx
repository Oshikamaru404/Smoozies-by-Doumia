
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Plus, Settings, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useChildrenStore } from "@/services/childrenService";
import { calculateAge } from "@/lib/utils";

const Dashboard = () => {
  const { children, activeChild, setActiveChild } = useChildrenStore();
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  
  useEffect(() => {
    // Ensure we have children data and set the default tab and active child
    if (children && children.length > 0) {
      if (!activeChild || !children.find(c => c.id === activeChild.id)) {
        setActiveChild(children[0]);
      }
      // Set selected tab ID based on active child
      if (activeChild) {
        setSelectedTabId(`child-${activeChild.id}`);
      } else {
        setSelectedTabId(`child-${children[0].id}`);
      }
    }
  }, [children, activeChild, setActiveChild]);
  
  // Default tab ID for when no children are present
  const defaultTabId = "no-children";
  const effectiveTabId = selectedTabId || (children?.length > 0 ? `child-${children[0].id}` : defaultTabId);
  
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 pt-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tableau de bord
          </h1>
          
          <Tabs value={effectiveTabId} className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-transparent p-0 h-auto space-x-2">
                {children && children.length > 0 ? (
                  children.map((child) => (
                    <TabsTrigger
                      key={child.id}
                      value={`child-${child.id}`}
                      onClick={() => {
                        setActiveChild(child);
                        setSelectedTabId(`child-${child.id}`);
                      }}
                      className="rounded-lg px-4 py-2 h-auto data-[state=active]:shadow-sm transition-all"
                    >
                      {child.name}
                      {child.status === "connected" && (
                        <span className="w-2 h-2 bg-primary rounded-full ml-2" />
                      )}
                    </TabsTrigger>
                  ))
                ) : (
                  <div className="text-muted-foreground px-2">Aucun enfant enregistré</div>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline-block">Ajouter</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="py-4 text-center">
                      <h3 className="text-lg font-medium mb-2">Ajouter un enfant</h3>
                      <p className="text-muted-foreground mb-4">
                        Vous allez être redirigé vers le formulaire d'ajout d'enfant.
                      </p>
                      <Button asChild>
                        <Link to="/add-child">Continuer</Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
            
            {/* Add default tab content for when no children exist */}
            <TabsContent value={defaultTabId} className="py-12 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-medium mb-3">Aucun enfant enregistré</h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par ajouter un profil pour votre enfant pour accéder aux fonctionnalités de PulcheCare.
                </p>
                <Button asChild>
                  <Link to="/add-child" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter un enfant
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            {children && children.length > 0 && children.map((child) => (
              <TabsContent key={child.id} value={`child-${child.id}`} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2 bg-gradient-to-br from-primary/5 to-accent/5 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-bold">{child.name}</h2>
                          <p className="text-muted-foreground">
                            {calculateAge(child.birthdate)} ans
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                            Dernière analyse: {child.emotionalState?.collected ? "aujourd'hui" : "non disponible"}
                          </Badge>
                          <Badge variant="outline" className="bg-accent/10 hover:bg-accent/20">
                            État: {child.emotionalState?.collected ? "Heureux" : "En attente de données"}
                          </Badge>
                        </div>
                      </div>
                      
                      <Alert className="bg-card">
                        <Bell className="h-4 w-4" />
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                          {child.emotionalState?.collected 
                            ? `${child.name} a été calme aujourd'hui. Aucune alerte détectée.`
                            : `En attente de données pour ${child.name}. Veuillez connecter la peluche pour collecter des informations.`
                          }
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                  
                  <PlushDeviceCard
                    name={child.plushName || "PulcheCare Buddy"}
                    status={child.status}
                    batteryLevel={child.batteryLevel}
                    lastSync={child.lastSync}
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {child.emotionalState?.collected ? (
                    <EmotionalStateCard />
                  ) : (
                    <Card className="shadow-soft">
                      <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
                        <div className="text-center max-w-sm">
                          <h3 className="text-lg font-medium mb-2">Données émotionnelles non disponibles</h3>
                          <p className="text-muted-foreground mb-4">
                            Les capteurs n'ont pas encore collecté de données émotionnelles pour {child.name}.
                            Connectez la peluche pour commencer la collecte.
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/settings">
                              Comment synchroniser
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {child.physicalState?.collected ? (
                    <HealthStatusCard />
                  ) : (
                    <Card className="shadow-soft">
                      <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
                        <div className="text-center max-w-sm">
                          <h3 className="text-lg font-medium mb-2">Données physiques non disponibles</h3>
                          <p className="text-muted-foreground mb-4">
                            Les capteurs n'ont pas encore collecté de données sur l'état physique de {child.name}.
                            Connectez la peluche pour commencer la collecte.
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/settings">
                              Comment synchroniser
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <QuickActionsCard childName={child.name} />
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
