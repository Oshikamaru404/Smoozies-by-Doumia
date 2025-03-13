
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Child = {
  id: number;
  name: string;
  birthdate: Date;
  gender: string;
  plushId?: string;
  plushName?: string;
  status: 'connected' | 'disconnected';
  batteryLevel: number;
  lastSync: string;
  preferences?: {
    favoriteActivities?: string;
    sleepHabits?: string;
    specialNeeds?: string;
  };
  emotionalState?: {
    collected: boolean;
    data?: {
      dominant: string;
      percentage: number;
      history: {
        date: string;
        emotions: {
          happy: number;
          calm: number;
          sad: number;
          anxious: number;
        }
      }[];
      dayAnalysis: {
        time: string;
        emotion: number;
      }[];
    };
  };
  physicalState?: {
    collected: boolean;
    data?: any;
  };
};

interface ChildrenState {
  children: Child[];
  activeChild: Child | null;
  setActiveChild: (child: Child) => void;
  addChild: (child: Omit<Child, 'id' | 'status' | 'batteryLevel' | 'lastSync' | 'emotionalState' | 'physicalState'>) => Child;
  updateChild: (id: number, updates: Partial<Child>) => void;
  removeChild: (id: number) => void;
}

// Données prédéfinies pour les profils initiaux
const initialProfiles: Child[] = [
  {
    id: 1,
    name: 'Hamza',
    birthdate: new Date('2018-05-15'),
    gender: 'Garçon',
    plushId: 'PC245789',
    plushName: 'Teddy',
    status: 'connected',
    batteryLevel: 78,
    lastSync: 'il y a 10 minutes',
    preferences: {
      favoriteActivities: 'Football, jeux vidéo',
      sleepHabits: 'Se couche à 21h',
      specialNeeds: 'Aucun',
    },
    emotionalState: {
      collected: true,
      data: {
        dominant: 'Heureux',
        percentage: 65,
        history: [
          {
            date: '2024-03-07',
            emotions: { happy: 60, calm: 25, sad: 10, anxious: 5 }
          },
          {
            date: '2024-03-08',
            emotions: { happy: 55, calm: 30, sad: 12, anxious: 3 }
          },
          {
            date: '2024-03-09',
            emotions: { happy: 70, calm: 20, sad: 5, anxious: 5 }
          },
          {
            date: '2024-03-10',
            emotions: { happy: 65, calm: 25, sad: 8, anxious: 2 }
          },
          {
            date: '2024-03-11',
            emotions: { happy: 75, calm: 15, sad: 5, anxious: 5 }
          },
          {
            date: '2024-03-12',
            emotions: { happy: 68, calm: 22, sad: 7, anxious: 3 }
          },
          {
            date: '2024-03-13',
            emotions: { happy: 72, calm: 18, sad: 6, anxious: 4 }
          }
        ],
        dayAnalysis: [
          { time: '08:00', emotion: 75 },
          { time: '10:00', emotion: 80 },
          { time: '12:00', emotion: 65 },
          { time: '14:00', emotion: 70 },
          { time: '16:00', emotion: 85 },
          { time: '18:00', emotion: 90 },
          { time: '20:00', emotion: 82 }
        ]
      }
    },
    physicalState: {
      collected: true,
      data: {
        activity: 'Élevé',
        sleep: 'Bon',
        restlessness: 'Faible'
      }
    }
  },
  {
    id: 2,
    name: 'Imane',
    birthdate: new Date('2020-03-21'),
    gender: 'Fille',
    plushId: 'PC876543',
    plushName: 'Pinky',
    status: 'connected',
    batteryLevel: 92,
    lastSync: 'il y a 5 minutes',
    preferences: {
      favoriteActivities: 'Dessin, danse',
      sleepHabits: 'Se couche à 20h',
      specialNeeds: 'Aucun',
    },
    emotionalState: {
      collected: true,
      data: {
        dominant: 'Calme',
        percentage: 70,
        history: [
          {
            date: '2024-03-07',
            emotions: { happy: 40, calm: 50, sad: 5, anxious: 5 }
          },
          {
            date: '2024-03-08',
            emotions: { happy: 45, calm: 45, sad: 8, anxious: 2 }
          },
          {
            date: '2024-03-09',
            emotions: { happy: 35, calm: 55, sad: 7, anxious: 3 }
          },
          {
            date: '2024-03-10',
            emotions: { happy: 40, calm: 50, sad: 8, anxious: 2 }
          },
          {
            date: '2024-03-11',
            emotions: { happy: 45, calm: 48, sad: 4, anxious: 3 }
          },
          {
            date: '2024-03-12',
            emotions: { happy: 42, calm: 52, sad: 5, anxious: 1 }
          },
          {
            date: '2024-03-13',
            emotions: { happy: 38, calm: 58, sad: 3, anxious: 1 }
          }
        ],
        dayAnalysis: [
          { time: '08:00', emotion: 65 },
          { time: '10:00', emotion: 75 },
          { time: '12:00', emotion: 80 },
          { time: '14:00', emotion: 75 },
          { time: '16:00', emotion: 70 },
          { time: '18:00', emotion: 75 },
          { time: '20:00', emotion: 85 }
        ]
      }
    },
    physicalState: {
      collected: true,
      data: {
        activity: 'Modéré',
        sleep: 'Très bon',
        restlessness: 'Très faible'
      }
    }
  }
];

export const useChildrenStore = create<ChildrenState>()(
  persist(
    (set, get) => ({
      // Initialiser avec les profils prédéfinis si le stockage est vide
      children: initialProfiles,
      activeChild: initialProfiles[0],
      setActiveChild: (child) => set({ activeChild: child }),
      addChild: (childData) => {
        const id = Date.now();
        const newChild: Child = {
          id,
          ...childData,
          status: 'connected',
          batteryLevel: Math.floor(Math.random() * 100),
          lastSync: 'à l\'instant',
          // Initialize emotional and physical state
          emotionalState: {
            collected: false
          },
          physicalState: {
            collected: false
          }
        };
        
        set((state) => {
          // Conserver tous les enfants existants et ajouter le nouveau
          const updatedChildren = [...state.children, newChild];
          return { 
            children: updatedChildren,
            // Si c'est le premier enfant, le définir comme actif
            activeChild: state.activeChild || newChild 
          };
        });
        
        return newChild;
      },
      updateChild: (id, updates) => {
        set((state) => ({
          children: state.children.map((child) => 
            child.id === id ? { ...child, ...updates } : child
          ),
          activeChild: state.activeChild?.id === id 
            ? { ...state.activeChild, ...updates }
            : state.activeChild
        }));
      },
      removeChild: (id) => {
        set((state) => {
          const updatedChildren = state.children.filter((child) => child.id !== id);
          return {
            children: updatedChildren,
            activeChild: state.activeChild?.id === id 
              ? updatedChildren[0] || null
              : state.activeChild
          };
        });
      },
    }),
    {
      name: 'children-storage',
    }
  )
);
