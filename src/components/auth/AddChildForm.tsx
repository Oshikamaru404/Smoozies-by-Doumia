
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Camera, Info, X } from "lucide-react";
import { QrReader } from "react-qr-reader";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  birthdate: z.date({
    required_error: "Veuillez sélectionner une date de naissance",
  }),
  gender: z.string({
    required_error: "Veuillez sélectionner un genre",
  }),
  preferences: z.object({
    favoriteActivities: z.string().optional(),
    sleepHabits: z.string().optional(),
    specialNeeds: z.string().optional(),
  }),
  plushId: z.string().optional(),
});

export function AddChildForm() {
  const [step, setStep] = useState(1);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
      preferences: {
        favoriteActivities: "",
        sleepHabits: "",
        specialNeeds: "",
      },
      plushId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Profil enfant créé",
      description: `Le profil de ${values.name} a été créé avec succès!`,
    });
    // Here would be the code to send the data to your backend
    // For now, we just log it to the console and show a toast
  };

  const goToNextStep = async () => {
    const stepFields = {
      1: ["name", "birthdate", "gender"],
      2: ["preferences.favoriteActivities", "preferences.sleepHabits", "preferences.specialNeeds"],
      3: ["plushId"],
    }[step] as Array<string>;

    const isValid = await form.trigger(stepFields as any);
    
    if (isValid) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map(i => (
        <div 
          key={i} 
          className="flex items-center"
        >
          <div 
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              step === i 
                ? "bg-primary text-primary-foreground" 
                : step > i 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted text-muted-foreground"
            )}
          >
            {i}
          </div>
          {i < 3 && (
            <div 
              className={cn(
                "h-0.5 w-8", 
                step > i ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const handleScan = (result: string | null) => {
    if (result) {
      form.setValue("plushId", result);
      setScanResult(result);
      toast({
        title: "QR Code détecté!",
        description: `ID de peluche: ${result}`,
      });
      setShowQrScanner(false);
    }
  };

  const handleScanError = (error: Error) => {
    console.error("QR Scanner error:", error);
    toast({
      title: "Erreur de lecture",
      description: "Impossible d'accéder à la caméra ou de lire le QR code"
    });
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-soft overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Ajouter un enfant</CardTitle>
        <CardDescription>
          Créez un profil pour votre enfant et associez sa peluche PulcheCare
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStepIndicator()}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Prénom de votre enfant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de naissance</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy", { locale: fr })
                              ) : (
                                <span>Sélectionnez une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="fille" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Fille
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="garçon" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Garçon
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="autre" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Autre
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-4 bg-muted/30 rounded-lg flex gap-3 mb-6">
                  <Info className="h-5 w-5 text-muted-foreground shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Ces informations nous aideront à personnaliser l'expérience pour votre enfant. 
                    Elles sont facultatives mais recommandées.
                  </p>
                </div>
                
                <FormField
                  control={form.control}
                  name="preferences.favoriteActivities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activités préférées</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Quelles sont les activités préférées de votre enfant?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Histoires, jeux, musiques ou autres activités que votre enfant apprécie.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferences.sleepHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habitudes de sommeil</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regulier">Sommeil régulier</SelectItem>
                            <SelectItem value="difficile">Difficultés d'endormissement</SelectItem>
                            <SelectItem value="cauchemars">Cauchemars fréquents</SelectItem>
                            <SelectItem value="reveils">Réveils nocturnes</SelectItem>
                            <SelectItem value="autres">Autres</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Ces informations nous aideront à adapter les routines du soir.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferences.specialNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Besoins particuliers</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre enfant a-t-il des besoins particuliers?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Sensibilités, troubles de l'attention, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium">Associer la peluche</h3>
                  <p className="text-muted-foreground">
                    Scannez le QR code situé sous la peluche pour l'associer au profil
                  </p>
                </div>
                
                <div className="flex justify-center mb-6">
                  {showQrScanner ? (
                    <div className="w-full max-w-md">
                      <div className="relative mb-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute top-2 right-2 z-10 bg-background/80"
                          onClick={() => setShowQrScanner(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="overflow-hidden rounded-lg border">
                          <QrReader
                            constraints={{ facingMode: 'environment' }}
                            onResult={(result) => {
                              if (result) {
                                handleScan(result.getText());
                              }
                            }}
                            scanDelay={500}
                            className="w-full"
                            videoStyle={{ objectFit: 'cover' }}
                            videoContainerStyle={{ 
                              position: 'relative',
                              width: '100%', 
                              height: '300px',
                              borderRadius: '0.5rem',
                              overflow: 'hidden'
                            }}
                            videoId="qr-reader-video"
                          />
                          <div className="absolute inset-0 border-2 border-primary/30 rounded-lg pointer-events-none"></div>
                        </div>
                        <p className="mt-2 text-sm text-center text-muted-foreground">
                          Centrez le QR code dans le cadre
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                      {scanResult ? (
                        <div className="text-center px-4">
                          <p className="font-medium text-primary mb-2">QR Code scanné!</p>
                          <p className="text-sm text-muted-foreground mb-3">ID: {scanResult}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setShowQrScanner(true)}
                          >
                            Scanner à nouveau
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setShowQrScanner(true)} 
                          className="gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          Scanner QR
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="plushId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID de la peluche</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ID de la peluche (ex: PLUSH-12345)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Vous pouvez aussi saisir manuellement l'ID de la peluche.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Besoin d'aide?</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Comment associer la peluche</DialogTitle>
                      <DialogDescription>
                        Suivez ces étapes simples pour associer la peluche au profil de votre enfant.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">1. Trouver le QR code</h4>
                        <p className="text-sm text-muted-foreground">
                          Le QR code est situé sous la peluche, sur l'étiquette.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">2. Scanner le QR code</h4>
                        <p className="text-sm text-muted-foreground">
                          Utilisez le bouton "Scanner QR" pour activer la caméra et scanner le code.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">3. Saisie manuelle</h4>
                        <p className="text-sm text-muted-foreground">
                          Si le scan ne fonctionne pas, vous pouvez saisir manuellement l'ID de la peluche.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="w-full">Compris</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 1}
        >
          Précédent
        </Button>
        
        {step < 3 ? (
          <Button onClick={goToNextStep}>
            Continuer
          </Button>
        ) : (
          <Button onClick={form.handleSubmit(onSubmit)}>
            Finaliser
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default AddChildForm;
