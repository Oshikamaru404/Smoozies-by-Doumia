
import { useState, useCallback, useEffect } from 'react';
import { geminiService, VoiceAssistantProps } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';
import { useChildrenStore } from '@/services/childrenService';
import { calculateAge } from '@/lib/utils';

interface UseVoiceAssistantReturn {
  isListening: boolean;
  isProcessing: boolean;
  lastResponse: string | null;
  startListening: () => void;
  stopListening: () => void;
  sendTextInput: (text: string) => Promise<string>;
  isInitialized: boolean;
}

export const useVoiceAssistant = (childId?: number): UseVoiceAssistantReturn => {
  const { toast } = useToast();
  const { children, activeChild } = useChildrenStore();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialiser l'assistant avec les données de l'enfant
  useEffect(() => {
    const child = childId 
      ? children.find(c => c.id === childId) 
      : activeChild;
      
    if (child) {
      const childAge = calculateAge(new Date(child.birthdate));
      
      geminiService.init({
        childId: child.id,
        childName: child.name,
        ageYears: childAge,
        voiceType: "amical",
        language: "fr"
      });
      
      setIsInitialized(true);
      console.log(`Assistant vocal initialisé pour ${child.name}`);
    }
  }, [childId, children, activeChild]);
  
  // Fonction pour démarrer l'écoute
  const startListening = useCallback(() => {
    if (!isInitialized) {
      toast({
        title: "Assistant non initialisé",
        description: "Veuillez patienter pendant l'initialisation de l'assistant vocal.",
      });
      return;
    }
    
    setIsListening(true);
    toast({
      title: "Écoute en cours",
      description: "L'assistant vocal vous écoute..."
    });
    
    // Simuler une fin d'écoute après 5 secondes
    setTimeout(() => {
      stopListening();
    }, 5000);
  }, [isInitialized, toast]);
  
  // Fonction pour arrêter l'écoute et traiter l'audio
  const stopListening = useCallback(async () => {
    if (!isListening) return;
    
    setIsListening(false);
    setIsProcessing(true);
    
    try {
      // Simuler un blob audio
      const audioBlob = new Blob([], { type: 'audio/wav' });
      
      // Traiter l'audio avec Gemini
      const response = await geminiService.processVoiceInput(audioBlob);
      
      setLastResponse(response.text);
      
      // Jouer l'audio si disponible (simulation)
      if (response.audio) {
        console.log("Lecture de l'audio de réponse...");
      }
    } catch (error) {
      console.error("Erreur lors du traitement vocal:", error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter votre demande vocale.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [isListening, toast]);
  
  // Fonction pour envoyer du texte directement
  const sendTextInput = useCallback(async (text: string): Promise<string> => {
    if (!isInitialized) {
      toast({
        title: "Assistant non initialisé",
        description: "Veuillez patienter pendant l'initialisation de l'assistant vocal.",
      });
      return "Assistant non initialisé";
    }
    
    setIsProcessing(true);
    
    try {
      const response = await geminiService.generateResponse(text);
      setLastResponse(response.text);
      return response.text;
    } catch (error) {
      console.error("Erreur lors de l'envoi du texte:", error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter votre message texte.",
        variant: "destructive"
      });
      return "Erreur de traitement";
    } finally {
      setIsProcessing(false);
    }
  }, [isInitialized, toast]);
  
  return {
    isListening,
    isProcessing,
    lastResponse,
    startListening,
    stopListening,
    sendTextInput,
    isInitialized
  };
};
