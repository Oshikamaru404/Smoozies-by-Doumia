import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import RecentActivitiesCard from "@/components/dashboard/RecentActivitiesCard";
import { useChildrenStore } from "@/services/childrenService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Book, BrainCircuit, CalendarDays, Clock, Gamepad2, Music, Play, Rocket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Program {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  category: "story" | "game" | "learning" | "music";
  duration: string;
  thumbnail?: string;
  isNew?: boolean;
  isPremium?: boolean;
}

const educationalPrograms: Program[] = [
  {
    id: "edu-1",
    title: "Découverte des Nombres",
    description: "Apprendre à compter et reconnaître les chiffres de façon ludique",
    ageRange: "3-6 ans",
    category: "learning",
    duration: "15 min",
    isNew: true
  },
  {
    id: "edu-2",
    title: "L'Alphabet en Chanson",
    description: "Mémoriser les lettres de l'alphabet à travers des mélodies amusantes",
    ageRange: "4-7 ans",
    category: "learning",
    duration: "10 min"
  },
  {
    id: "edu-3",
    title: "Les Couleurs et les Formes",
    description: "Identifier et nommer les couleurs et les formes géométriques",
    ageRange: "2-5 ans",
    category: "learning",
    duration: "12 min"
  }
];

const storyPrograms: Program[] = [
  {
    id: "story-1",
    title: "Le Voyage de Luna",
    description: "Luna part à l'aventure dans un monde de rêves où tout est possible",
    ageRange: "3-6 ans",
    category: "story",
    duration: "8 min"
  },
  {
    id: "story-2",
    title: "Tim et le Dragon Amical",
    description: "Tim se lie d'amitié avec un dragon qui a peur du noir",
    ageRange: "4-8 ans",
    category: "story",
    duration: "10 min"
  },
  {
    id: "story-3",
    title: "La Forêt Enchantée",
    description: "Une promenade nocturne dans une forêt où les arbres racontent des histoires",
    ageRange: "5-9 ans",
    category: "story",
    duration: "12 min",
    isPremium: true
  }
];

const gamePrograms: Program[] = [
  {
    id: "game-1",
    title: "Chasse au Trésor",
    description: "Une aventure interactive pour retrouver des objets cachés",
    ageRange: "4-8 ans",
    category: "game",
    duration: "20 min",
    isNew: true
  },
  {
    id: "game-2",
    title: "Danse avec Teddy",
    description: "Jeu de mouvements et de coordination pour s'amuser en bougeant",
    ageRange: "3-7 ans",
    category: "game",
    duration: "15 min"
  }
];

const musicPrograms: Program[] = [
  {
    id: "music-1",
    title: "Petits Musiciens",
    description: "Découvrir les instruments de musique et leurs sons",
    ageRange: "3-8 ans",
    category: "music",
    duration: "10 min"
  },
  {
    id: "music-2",
    title: "Comptines Interactives",
    description: "Chanter et jouer avec des comptines traditionnelles",
    ageRange: "2-6 ans",
    category: "music",
    duration: "12 min"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "story":
      return <Book className="h-4 w-4" />;
    case "game":
      return <Gamepad2 className="h-4 w-4" />;
    case "learning":
      return <BrainCircuit className="h-4 w-4" />;
    case "music":
      return <Music className="h-4 w-4" />;
    default:
      return <CalendarDays className="h-4 w-4" />;
  }
};

const getCategoryStyles = (category: string) => {
  switch (category) {
    case "story":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    case "game":
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    case "learning":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
    case "music":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
  }
};

const ProgramCard = ({ program }: { program: Program }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div 
        className="relative rounded-lg border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group"
        onClick={() => setOpenDialog(true)}
      >
        {program.isNew && (
          <Badge 
            variant="default" 
            className="absolute top-2 right-2 z-10"
          >
            Nouveau
          </Badge>
        )}
        {program.isPremium && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 z-10"
          >
            Premium
          </Badge>
        )}
        
        <div className={cn(
          "h-32 flex items-center justify-center",
          getCategoryStyles(program.category)
        )}>
          <div className="text-4xl">
            {getCategoryIcon(program.category)}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{program.title}</h3>
            <Badge variant="outline">{program.ageRange}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {program.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {program.duration}
            </span>
            <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="h-4 w-4 mr-1" />
              Lancer
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{program.title}</DialogTitle>
            <DialogDescription>
              {program.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {program.duration}
              </Badge>
              <Badge variant="outline">{program.ageRange}</Badge>
            </div>
            
            <div className={cn(
              "p-4 rounded-lg flex items-center gap-3",
              "bg-muted/50 border"
            )}>
              <div className={cn(
                "p-2 rounded-full",
                getCategoryStyles(program.category)
              )}>
                {getCategoryIcon(program.category)}
              </div>
              <div>
                <h4 className="font-medium text-sm">Catégorie: {program.category === "story" ? "Histoire" : program.category === "game" ? "Jeu" : program.category === "learning" ? "Apprentissage" : "Musique"}</h4>
                <p className="text-xs text-muted-foreground">
                  {program.category === "story" ? "Stimule l'imagination et le langage" :
                   program.category === "game" ? "Développe la motricité et la coordination" : 
                   program.category === "learning" ? "Favorise l'apprentissage et la cognition" : 
                   "Encourage l'expression et la créativité"}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Annuler
              </Button>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Démarrer l'activité
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Activities = () => {
  const { activeChild } = useChildrenStore();
  const [showNoChildAlert, setShowNoChildAlert] = useState(!activeChild);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Activités</h1>

        {showNoChildAlert && (
          <div className="mb-6 p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Aucun profil enfant sélectionné</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Pour accéder aux activités personnalisées, veuillez créer ou sélectionner un profil enfant.
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RecentActivitiesCard />
          
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-3">
              <CardTitle>Programmes ludiques</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="educational">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="educational" className="flex items-center gap-1">
                    <BrainCircuit className="h-4 w-4" />
                    <span className="hidden sm:inline">Éducatif</span>
                  </TabsTrigger>
                  <TabsTrigger value="stories" className="flex items-center gap-1">
                    <Book className="h-4 w-4" />
                    <span className="hidden sm:inline">Histoires</span>
                  </TabsTrigger>
                  <TabsTrigger value="games" className="flex items-center gap-1">
                    <Gamepad2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Jeux</span>
                  </TabsTrigger>
                  <TabsTrigger value="music" className="flex items-center gap-1">
                    <Music className="h-4 w-4" />
                    <span className="hidden sm:inline">Musique</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="educational" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {educationalPrograms.map(program => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="stories" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {storyPrograms.map(program => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="games" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {gamePrograms.map(program => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="music" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {musicPrograms.map(program => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Activities;
