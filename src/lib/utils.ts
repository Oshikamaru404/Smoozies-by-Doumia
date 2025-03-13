
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction améliorée pour calculer l'âge à partir de la date de naissance
export function calculateAge(birthdate: Date | string | undefined): number {
  if (!birthdate) {
    console.log("Warning: birthdate is undefined or null");
    return 0;
  }
  
  try {
    const today = new Date();
    const birthDate = new Date(birthdate);
    
    // Vérifier si la date est valide
    if (isNaN(birthDate.getTime())) {
      console.log("Warning: invalid birthdate", birthdate);
      return 0;
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return 0;
  }
}
