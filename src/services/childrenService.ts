
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
};

interface ChildrenState {
  children: Child[];
  activeChild: Child | null;
  setActiveChild: (child: Child) => void;
  addChild: (child: Omit<Child, 'id' | 'status' | 'batteryLevel' | 'lastSync'>) => Child;
  updateChild: (id: number, updates: Partial<Child>) => void;
  removeChild: (id: number) => void;
}

export const useChildrenStore = create<ChildrenState>()(
  persist(
    (set, get) => ({
      children: [],
      activeChild: null,
      setActiveChild: (child) => set({ activeChild: child }),
      addChild: (childData) => {
        const id = Date.now();
        const newChild: Child = {
          id,
          ...childData,
          status: 'connected',
          batteryLevel: Math.floor(Math.random() * 100),
          lastSync: 'à l\'instant',
        };
        
        set((state) => {
          const updatedChildren = [...state.children, newChild];
          return { 
            children: updatedChildren,
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
