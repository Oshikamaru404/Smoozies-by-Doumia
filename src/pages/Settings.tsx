
import Navbar from "@/components/layout/Navbar";
import SensorSyncExplainer from "@/components/plush/SensorSyncExplainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Shield, Smartphone, UserCog, Wifi } from "lucide-react";

const Settings = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
        
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="account" className="gap-2">
              <UserCog className="h-4 w-4" />
              <span>Compte</span>
            </TabsTrigger>
            <TabsTrigger value="plush" className="gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Peluche</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              <span>Confidentialité</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et les paramètres de sécurité.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Vos informations</h3>
                  <p className="text-muted-foreground text-sm">
                    Gérez votre profil et vos informations personnelles
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Connexion et sécurité</h3>
                  <p className="text-muted-foreground text-sm">
                    Paramètres de mot de passe et de sécurité du compte
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Sauvegarder les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="plush" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de la peluche</CardTitle>
                <CardDescription>
                  Configurez les paramètres de votre peluche PulcheCare.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Connectivité</h3>
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Réseau Wi-Fi</p>
                      <p className="text-sm text-muted-foreground">Gérez la connexion Wi-Fi de la peluche</p>
                    </div>
                    <Button variant="outline" size="sm">Configurer</Button>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Mise à jour du firmware</h3>
                  <p className="text-muted-foreground text-sm">
                    Version actuelle: 1.2.4
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto mt-2">Vérifier les mises à jour</Button>
                </div>
              </CardContent>
            </Card>
            
            <SensorSyncExplainer />
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>
                  Configurez comment et quand vous souhaitez être notifié.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Personnalisez vos préférences de notifications pour les alertes, 
                  les mises à jour et les nouvelles fonctionnalités.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Confidentialité et données</CardTitle>
                <CardDescription>
                  Gérez vos données et préférences de confidentialité.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contrôlez quelles données sont collectées et comment elles sont utilisées.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Settings;
