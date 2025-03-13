
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChildrenStore } from "@/services/childrenService";
import Navbar from "@/components/layout/Navbar";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { 
  Collapsible, CollapsibleContent, CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, AlertCircle, Info, BookOpen, Stethoscope, 
  Brain, Heart, BarChart, ChevronDown, ChevronRight, CheckCircle2, HelpCircle
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const medicalSpecialists = [
  { 
    id: 1, 
    name: "Dr. Sophie Martin", 
    specialty: "Pédopsychiatre", 
    distance: "2.5 km",
    address: "24 Rue Rivoli, Paris",
    rating: 4.8,
    availableOn: "Lun, Mer, Ven"
  },
  { 
    id: 2, 
    name: "Dr. Antoine Dubois", 
    specialty: "Neurologue pédiatrique", 
    distance: "4.1 km",
    address: "8 Avenue Montaigne, Paris",
    rating: 4.7,
    availableOn: "Mar, Jeu"
  },
  { 
    id: 3, 
    name: "Dr. Emilie Rousseau", 
    specialty: "Psychologue enfance", 
    distance: "1.8 km",
    address: "15 Boulevard Haussmann, Paris",
    rating: 4.9,
    availableOn: "Lun, Mar, Mer, Jeu, Ven"
  },
  { 
    id: 4, 
    name: "Dr. Thomas Petit", 
    specialty: "Audiologiste", 
    distance: "3.2 km",
    address: "42 Rue Saint-Honoré, Paris",
    rating: 4.6,
    availableOn: "Mar, Jeu, Ven"
  },
  { 
    id: 5, 
    name: "Dr. Nadia Benali", 
    specialty: "Neuropédiatre", 
    distance: "5.5 km",
    address: "17 Rue de la Paix, Paris",
    rating: 4.9,
    availableOn: "Mer, Jeu, Ven"
  }
];

const conditionAdvice = {
  stress: {
    title: "Conseils pour les situations de stress",
    description: "Comment aider votre enfant à gérer son stress",
    content: [
      {
        heading: "Reconnaître les signes de stress chez l'enfant",
        text: "Le stress peut se manifester différemment chez les enfants que chez les adultes. Soyez attentif aux changements de comportement, aux plaintes somatiques (maux de tête, maux d'estomac), aux troubles du sommeil, à l'irritabilité inhabituelle ou au retrait social.",
        priority: "high"
      },
      {
        heading: "Créer un environnement sécurisant",
        text: "Maintenez des routines prévisibles, offrez un espace calme où l'enfant peut se détendre, et assurez-vous qu'il sait qu'il peut vous parler de ses préoccupations sans jugement.",
        priority: "high"
      },
      {
        heading: "Techniques de respiration adaptées aux enfants",
        text: "Enseignez à votre enfant des techniques simples comme 'respirer comme un ballon' (inspiration profonde, expiration lente) ou la respiration par le ventre. Transformez ces exercices en jeu pour les rendre accessibles.",
        priority: "medium"
      },
      {
        heading: "Communication ouverte",
        text: "Encouragez votre enfant à exprimer ses émotions avec des phrases comme 'Je vois que tu sembles inquiet. Veux-tu en parler?' Validez ses sentiments même s'ils semblent disproportionnés.",
        priority: "medium"
      },
      {
        heading: "Quand consulter un professionnel",
        text: "Si les symptômes de stress persistent plusieurs semaines, interfèrent avec les activités quotidiennes ou s'aggravent, il est recommandé de consulter un pédiatre ou un pédopsychologue.",
        priority: "low"
      }
    ],
    specialists: ["Psychologue enfance", "Pédopsychiatre"]
  },
  anxiety: {
    title: "Gestion de l'anxiété",
    description: "Soutenir un enfant présentant des signes d'anxiété",
    content: [
      {
        heading: "Différence entre stress ponctuel et anxiété",
        text: "L'anxiété est un état de stress persistant, souvent sans cause immédiate identifiable. Elle peut se manifester par des inquiétudes excessives, des pensées intrusives ou des comportements d'évitement.",
        priority: "high"
      },
      {
        heading: "Approche parentale recommandée",
        text: "Évitez de renforcer les peurs en permettant systématiquement l'évitement. Encouragez plutôt l'exposition graduelle aux situations anxiogènes, tout en offrant un soutien constant.",
        priority: "high"
      },
      {
        heading: "Activités qui réduisent l'anxiété",
        text: "L'exercice physique régulier, les pratiques de pleine conscience adaptées aux enfants, et les activités créatives peuvent réduire significativement les symptômes d'anxiété.",
        priority: "medium"
      },
      {
        heading: "Recadrer les pensées anxieuses",
        text: "Aidez votre enfant à identifier et remettre en question ses pensées inquiétantes en posant des questions comme 'Que se passerait-il vraiment si...?' ou 'Est-ce que cela est déjà arrivé avant?'",
        priority: "medium"
      },
      {
        heading: "Ressources professionnelles",
        text: "Les thérapies cognitivo-comportementales sont particulièrement efficaces pour l'anxiété infantile. Votre médecin peut vous orienter vers des spécialistes adaptés à la situation de votre enfant.",
        priority: "low"
      }
    ],
    specialists: ["Pédopsychiatre", "Psychologue enfance"]
  },
  autism: {
    title: "Signes évocateurs d'autisme",
    description: "Comprendre les comportements qui pourraient indiquer un trouble du spectre autistique",
    content: [
      {
        heading: "Comportements à observer",
        text: "Les signes précoces peuvent inclure un contact visuel limité, un retard dans l'acquisition du langage, des intérêts restreints ou des comportements répétitifs, des difficultés d'interaction sociale, ou des réactions inhabituelles aux stimuli sensoriels.",
        priority: "high"
      },
      {
        heading: "Importance d'un diagnostic précoce",
        text: "Une identification précoce permet une intervention plus efficace. Si vous observez plusieurs de ces signes de façon persistante, consultez un spécialiste pour une évaluation complète.",
        priority: "high"
      },
      {
        heading: "Communication adaptée",
        text: "Utilisez un langage clair et concret, accordez plus de temps pour le traitement de l'information, et soutenez la communication avec des supports visuels si nécessaire.",
        priority: "medium"
      },
      {
        heading: "Environnement adapté",
        text: "Structurez l'environnement pour le rendre prévisible, réduisez les stimulations sensorielles excessives, et établissez des routines claires pour diminuer l'anxiété.",
        priority: "medium"
      },
      {
        heading: "Parcours de soins",
        text: "L'équipe de diagnostic peut inclure pédopsychiatres, psychologues, orthophonistes et ergothérapeutes. Des programmes d'intervention précoce peuvent être proposés après le diagnostic.",
        priority: "low"
      }
    ],
    specialists: ["Pédopsychiatre", "Neurologue pédiatrique", "Neuropédiatre"]
  },
  adhd: {
    title: "Signes de TDAH",
    description: "Reconnaître le trouble déficitaire de l'attention avec ou sans hyperactivité",
    content: [
      {
        heading: "Manifestations principales",
        text: "Le TDAH peut se manifester par une combinaison d'inattention (difficulté à maintenir l'attention, distractibilité), d'hyperactivité (agitation motrice excessive) et d'impulsivité (agir sans réfléchir).",
        priority: "high"
      },
      {
        heading: "Contextes révélateurs",
        text: "Les symptômes doivent être présents dans plusieurs environnements (maison, école) et avoir un impact significatif sur le fonctionnement quotidien pour évoquer un TDAH.",
        priority: "high"
      },
      {
        heading: "Stratégies parentales efficaces",
        text: "Établissez des routines prévisibles, donnez des instructions claires et brèves, divisez les tâches complexes en étapes simples, et renforcez positivement les comportements adaptés.",
        priority: "medium"
      },
      {
        heading: "Aménagements scolaires",
        text: "Des adaptations comme un placement à l'avant de la classe, des pauses fréquentes, ou des consignes écrites peuvent aider. Discutez avec l'école des aménagements possibles.",
        priority: "medium"
      },
      {
        heading: "Approche thérapeutique",
        text: "Le traitement peut combiner approches comportementales, aménagements environnementaux et, dans certains cas, traitement médicamenteux sous supervision médicale spécialisée.",
        priority: "low"
      }
    ],
    specialists: ["Neuropédiatre", "Pédopsychiatre"]
  },
  hearing: {
    title: "Signes de troubles auditifs",
    description: "Identifier une possible déficience auditive chez l'enfant",
    content: [
      {
        heading: "Signes d'alerte",
        text: "Absence de réaction aux bruits forts, retard de langage, besoin d'augmenter le volume, demande fréquente de répétition, ou inattention apparente peuvent suggérer un trouble auditif.",
        priority: "high"
      },
      {
        heading: "Évaluation recommandée",
        text: "Si vous observez ces signes, consultez rapidement un pédiatre qui pourra vous orienter vers un ORL pédiatrique ou un audiologiste pour des tests auditifs complets.",
        priority: "high"
      },
      {
        heading: "Communication facilitée",
        text: "Face à un enfant avec déficit auditive, parlez clairement en face de lui, utilisez des gestes naturels pour appuyer vos propos, et réduisez les bruits de fond.",
        priority: "medium"
      },
      {
        heading: "Technologies d'assistance",
        text: "Selon la nature et le degré de la perte auditive, des aides auditives, des implants cochléaires ou d'autres technologies peuvent être recommandés.",
        priority: "medium"
      },
      {
        heading: "Soutien au développement langagier",
        text: "Une intervention précoce avec orthophoniste spécialisé est cruciale pour le développement optimal du langage chez les enfants avec déficience auditive.",
        priority: "low"
      }
    ],
    specialists: ["Audiologiste", "Pédiatre"]
  },
  epilepsy: {
    title: "Épilepsie infantile nocturne",
    description: "Comprendre et gérer les crises d'épilepsie nocturnes",
    content: [
      {
        heading: "Reconnaître une crise",
        text: "Les crises nocturnes peuvent inclure des mouvements rythmiques, une rigidité musculaire, des automatismes (mouvements répétitifs), ou des réveils inexpliqués avec confusion.",
        priority: "high"
      },
      {
        heading: "Mesures de sécurité",
        text: "Sécurisez l'environnement de sommeil (évitez lits en hauteur, objets dangereux), envisagez un moniteur de surveillance, et apprenez les gestes de premiers secours adaptés.",
        priority: "high"
      },
      {
        heading: "Consignes pendant une crise",
        text: "Restez calme, notez la durée, placez l'enfant en position latérale de sécurité, n'introduisez rien dans la bouche, et appelez les secours si la crise dure plus de 5 minutes.",
        priority: "medium"
      },
      {
        heading: "Journal des crises",
        text: "Tenez un journal détaillant fréquence, durée et manifestations des crises pour aider le médecin à ajuster le traitement et identifier d'éventuels déclencheurs.",
        priority: "medium"
      },
      {
        heading: "Traitements disponibles",
        text: "L'épilepsie infantile nocturne est souvent bien contrôlée par médicaments. Dans certains cas, une rémission spontanée est possible avec l'âge. Un suivi neurologique régulier est essentiel.",
        priority: "low"
      }
    ],
    specialists: ["Neurologue pédiatrique", "Neuropédiatre"]
  }
};

const ParentResourcesPage = () => {
  const { activeChild } = useChildrenStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeCondition, setActiveCondition] = useState("stress");
  const [showMap, setShowMap] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    if (!activeChild) {
      toast({
        title: "Aucun profil sélectionné",
        description: "Veuillez sélectionner un profil d'enfant pour accéder aux ressources personnalisées",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [activeChild, navigate, toast]);

  if (!activeChild) return null;

  const getRelevantConditions = () => {
    const relevant = [];
    
    if (activeChild.emotionalState?.collected) {
      const emotionData = activeChild.emotionalState.data;
      
      const recentEmotions = emotionData?.history?.slice(-3) || [];
      const recentAnxiety = recentEmotions.some(day => day.emotions.anxious > 20);
      
      if (recentAnxiety) {
        relevant.push("anxiety");
      }
    }
    
    return relevant;
  };
  
  const relevantConditions = getRelevantConditions();

  const handleFindSpecialist = (specialties) => {
    setShowMap(true);
  };

  const getPersonalizedAdvice = () => {
    if (!activeChild.emotionalState?.collected) {
      return null;
    }

    const emotionData = activeChild.emotionalState.data;
    if (!emotionData || !emotionData.history || emotionData.history.length === 0) {
      return null;
    }

    const recentEmotions = emotionData.history.slice(-3);
    
    const stressLevel = recentEmotions.reduce((acc, day) => acc + (day.emotions.anxious || 0), 0) / 3;
    const happinessLevel = recentEmotions.reduce((acc, day) => acc + (day.emotions.happy || 0), 0) / 3;
    
    let advice = null;
    
    if (stressLevel > 15) {
      advice = {
        title: `${activeChild.name} pourrait souffrir de stress scolaire`,
        description: "Nos analyses indiquent des niveaux d'anxiété plus élevés que la normale ces derniers jours.",
        recommendations: [
          "Prenez le temps de discuter calmement avec votre enfant de sa journée d'école",
          "Observez s'il mentionne des difficultés avec certaines matières ou des camarades",
          "Assurez-vous qu'il dispose d'un espace calme pour faire ses devoirs",
          "Contactez son enseignant pour discuter de son comportement en classe"
        ],
        condition: "stress",
        severity: stressLevel > 25 ? "high" : "medium"
      };
    } else if (happinessLevel < 40) {
      advice = {
        title: `${activeChild.name} semble moins heureux ces derniers jours`,
        description: "Nos analyses montrent une baisse des émotions positives récemment.",
        recommendations: [
          "Passez plus de temps en famille autour d'activités qu'il apprécie",
          "Encouragez-le à exprimer ses émotions à travers des activités créatives",
          "Identifiez ensemble les moments de la journée les plus difficiles"
        ],
        condition: "anxiety",
        severity: "medium"
      };
    }
    
    return advice;
  };
  
  const personalizedAdvice = getPersonalizedAdvice();

  return (
    <>
      <Navbar />
      <div className="container py-8 max-w-7xl">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Ressources pour Parents
            </h1>
            <p className="text-muted-foreground">
              Conseils personnalisés et ressources pour accompagner le développement de {activeChild.name}
            </p>
          </div>
          
          {personalizedAdvice && (
            <Card className={cn(
              "border-l-4 shadow-md",
              personalizedAdvice.severity === "high" ? "border-l-red-500" : "border-l-orange-400"
            )}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {personalizedAdvice.severity === "high" ? 
                      <AlertCircle className="h-6 w-6 text-red-500 mt-1 shrink-0" /> : 
                      <HelpCircle className="h-6 w-6 text-orange-400 mt-1 shrink-0" />
                    }
                    <div>
                      <CardTitle className="text-xl">{personalizedAdvice.title}</CardTitle>
                      <CardDescription className="mt-1">{personalizedAdvice.description}</CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="shrink-0"
                    onClick={() => setActiveCondition(personalizedAdvice.condition)}
                  >
                    Voir plus
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="ml-9">
                  <h4 className="font-medium mb-2">Nos recommandations:</h4>
                  <ul className="space-y-2">
                    {personalizedAdvice.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
          
          {relevantConditions.length > 0 && (
            <Alert className="bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/30">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                <span className="font-semibold">Attention :</span> Nous avons détecté des signes qui pourraient nécessiter votre attention.
                Consultez les sections {relevantConditions.map(c => conditionAdvice[c].title).join(", ")}.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue={activeCondition} onValueChange={setActiveCondition} className="w-full">
            <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="stress">Stress</TabsTrigger>
              <TabsTrigger value="anxiety">Anxiété</TabsTrigger>
              <TabsTrigger value="autism">Autisme</TabsTrigger>
              <TabsTrigger value="adhd">TDAH</TabsTrigger>
              <TabsTrigger value="hearing">Audition</TabsTrigger>
              <TabsTrigger value="epilepsy">Épilepsie</TabsTrigger>
            </TabsList>
            
            {Object.entries(conditionAdvice).map(([key, condition]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{condition.title}</CardTitle>
                        <CardDescription>{condition.description}</CardDescription>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => setShowDisclaimer(true)}
                      >
                        <Info className="h-4 w-4" />
                        <span className="hidden sm:inline">Important</span>
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {condition.content.map((item, index) => (
                      <Collapsible key={index}>
                        <div className="flex items-start gap-2">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-6 mt-0.5">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </CollapsibleTrigger>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{item.heading}</h3>
                              {item.priority === 'high' && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">Prioritaire</Badge>
                              )}
                            </div>
                            
                            <CollapsibleContent>
                              <p className="text-muted-foreground text-sm mt-2">
                                {item.text}
                              </p>
                            </CollapsibleContent>
                          </div>
                        </div>
                      </Collapsible>
                    ))}
                    
                    <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                      <div className="text-sm space-y-1">
                        <p className="font-medium">Types de spécialistes recommandés:</p>
                        <div className="flex flex-wrap gap-2">
                          {condition.specialists.map((specialist, i) => (
                            <Badge key={i} variant="outline" className="bg-primary/5">
                              {specialist}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleFindSpecialist(condition.specialists)}
                        className="shrink-0"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Trouver un spécialiste
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>Ressources supplémentaires</CardTitle>
              <CardDescription>Guides et lectures recommandées pour les parents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="flex gap-4 items-start">
                        <BookOpen className="h-8 w-8 text-primary shrink-0 mt-1" />
                        <div>
                          <h3 className="font-medium">Guide pour parents: Communication positive</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Techniques de communication pour développer une relation de confiance avec votre enfant.
                          </p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Guide pour parents: Communication positive</DialogTitle>
                      <DialogDescription>
                        Techniques pour communiquer efficacement avec votre enfant
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>
                        La communication positive est fondamentale pour développer une relation de confiance avec votre enfant. 
                        Ce guide vous propose des techniques concrètes pour améliorer votre communication quotidienne.
                      </p>
                      <h4 className="font-semibold">Points clés:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Écoute active: accordez toute votre attention</li>
                        <li>Validation des émotions: reconnaissez les sentiments</li>
                        <li>Questions ouvertes: encouragez l'expression</li>
                        <li>Moments dédiés: créez des rituels de discussion</li>
                        <li>Communication non-verbale: soyez attentif au langage corporel</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <Button>Télécharger le guide complet</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="flex gap-4 items-start">
                        <Brain className="h-8 w-8 text-primary shrink-0 mt-1" />
                        <div>
                          <h3 className="font-medium">Développement cognitif: âge par âge</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Comprendre les étapes du développement cognitif pour mieux soutenir l'apprentissage.
                          </p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Développement cognitif: âge par âge</DialogTitle>
                      <DialogDescription>
                        Comprendre l'évolution des capacités cognitives de votre enfant
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>
                        À chaque âge correspondent des étapes spécifiques de développement cognitif. Ce guide vous aide à comprendre 
                        où en est votre enfant et comment l'accompagner.
                      </p>
                      <h4 className="font-semibold">Étapes clés:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><span className="font-medium">0-2 ans:</span> Pensée sensorimotrice, exploration du monde par les sens</li>
                        <li><span className="font-medium">2-7 ans:</span> Pensée préopératoire, début du langage symbolique</li>
                        <li><span className="font-medium">7-11 ans:</span> Opérations concrètes, logique appliquée à des objets concrets</li>
                        <li><span className="font-medium">11+ ans:</span> Opérations formelles, raisonnement abstrait</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <Button>Explorer les activités adaptées par âge</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="flex gap-4 items-start">
                        <Heart className="h-8 w-8 text-primary shrink-0 mt-1" />
                        <div>
                          <h3 className="font-medium">Développement socio-émotionnel</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Comment aider votre enfant à développer intelligence émotionnelle et compétences sociales.
                          </p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Développement socio-émotionnel</DialogTitle>
                      <DialogDescription>
                        Favoriser l'intelligence émotionnelle de votre enfant
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>
                        L'intelligence émotionnelle est aussi importante que l'intelligence cognitive pour réussir dans la vie.
                        Découvrez comment aider votre enfant à développer cette compétence essentielle.
                      </p>
                      <h4 className="font-semibold">Axes de développement:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Reconnaître ses propres émotions</li>
                        <li>Comprendre les émotions des autres (empathie)</li>
                        <li>Réguler ses émotions de façon adaptée</li>
                        <li>Développer des relations positives</li>
                        <li>Prendre des décisions responsables</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <Button>Découvrir les activités recommandées</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="flex gap-4 items-start">
                        <Stethoscope className="h-8 w-8 text-primary shrink-0 mt-1" />
                        <div>
                          <h3 className="font-medium">Santé et développement</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Calendrier des examens médicaux recommandés et signes qui nécessitent une consultation.
                          </p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Santé et développement</DialogTitle>
                      <DialogDescription>
                        Suivi médical recommandé et signaux d'alerte
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>
                        Un suivi médical régulier est essentiel pour s'assurer du bon développement de votre enfant.
                        Ce guide vous aide à comprendre quand consulter et quels signes surveiller.
                      </p>
                      <h4 className="font-semibold">Examens recommandés:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Visites pédiatriques régulières (calendrier par âge)</li>
                        <li>Suivi dentaire à partir de 1 an</li>
                        <li>Examen de la vision à 3 ans</li>
                        <li>Bilan auditif au moindre doute</li>
                        <li>Bilan de développement à l'entrée en maternelle</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <Button>Télécharger le calendrier complet</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <AlertDialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Note importante</AlertDialogTitle>
              <AlertDialogDescription>
                Les conseils fournis dans cette section sont à titre informatif uniquement et ne remplacent pas l'avis d'un professionnel de santé.
                <br /><br />
                Si vous avez des inquiétudes concernant le développement ou la santé de votre enfant, consultez un médecin ou un spécialiste qualifié.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fermer</AlertDialogCancel>
              <AlertDialogAction>J'ai compris</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Sheet open={showMap} onOpenChange={setShowMap}>
          <SheetContent className="w-full md:max-w-md" side="right">
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Spécialistes à proximité</h2>
                <p className="text-sm text-muted-foreground">
                  Basé sur votre localisation actuelle
                </p>
                
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Rechercher un spécialiste..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto space-y-3 pr-1">
                {medicalSpecialists.map(specialist => (
                  <div 
                    key={specialist.id}
                    className="bg-card p-3 rounded-lg border shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{specialist.name}</h3>
                        <p className="text-sm text-primary">{specialist.specialty}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/5">
                        {specialist.distance}
                      </Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="flex items-center text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                        {specialist.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ParentResourcesPage;
