
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, Cpu, Database, Wifi, Zap } from "lucide-react";

const SensorSyncExplainer = () => {
  return (
    <Card className="shadow-soft overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>Comment fonctionne la synchronisation des capteurs</CardTitle>
        <CardDescription>
          La communication entre la peluche et l'application des parents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Architecture technique</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-muted/10">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-5 w-5 text-primary" />
                <h4 className="font-medium">1. Capteurs ESP32</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Les capteurs (température, mouvement, son) dans la peluche collectent des données en temps réel. 
                Le microcontrôleur ESP32 traite ces informations localement.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/10">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="h-5 w-5 text-primary" />
                <h4 className="font-medium">2. Transmission Wi-Fi</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                L'ESP32 se connecte à votre réseau Wi-Fi domestique et envoie les données à notre serveur 
                cloud sécurisé via des requêtes HTTPS chiffrées à intervalles réguliers.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/10">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-primary" />
                <h4 className="font-medium">3. Stockage cloud</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Les données sont stockées dans notre base de données sécurisée et traitées par 
                nos algorithmes d'analyse comportementale et émotionnelle.
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative border rounded-lg p-5 pt-8 overflow-hidden">
          <span className="absolute top-2 left-4 text-xs font-medium text-muted-foreground">
            Flux de données
          </span>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Peluche</span>
              <span className="text-xs text-muted-foreground">Capteurs actifs</span>
            </div>
            
            <ArrowDownUp className="h-5 w-5 text-muted-foreground hidden md:block transform rotate-90 md:rotate-0" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Synchronisation</span>
              <span className="text-xs text-muted-foreground">~5 minutes d'intervalle</span>
            </div>
            
            <ArrowDownUp className="h-5 w-5 text-muted-foreground hidden md:block transform rotate-90 md:rotate-0" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Serveur</span>
              <span className="text-xs text-muted-foreground">Analyse & stockage</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-primary/5 rounded-lg">
          <h3 className="text-md font-medium mb-2">Sécurité des données</h3>
          <p className="text-sm text-muted-foreground">
            Toutes les communications entre la peluche et nos serveurs sont chiffrées. 
            Vos données sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers.
            Les informations sensibles comme les enregistrements audio sont traités localement 
            et seules les métadonnées sont envoyées à nos serveurs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorSyncExplainer;
