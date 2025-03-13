
import { toast } from "sonner";

// Configuration API
const API_BASE_URL = "http://localhost:5000"; // Remplacez par l'URL de votre backend Flask/FastAPI

// Types pour les données de capteurs
export interface SensorData {
  heartRate?: number;
  temperature?: number;
  sleepQuality?: number;
  activity?: number;
  timestamp?: string;
  deviceId?: string;
}

export interface FirmwareStatus {
  version: string;
  batteryLevel: number;
  lastSync: Date;
  isConnected: boolean;
}

// Fonction pour récupérer les données des capteurs en temps réel
export const fetchSensorData = async (childId: number, deviceId?: string): Promise<SensorData> => {
  try {
    // En production, vous feriez un appel API réel
    // const response = await fetch(`${API_BASE_URL}/api/sensors/${deviceId || childId}`);
    // if (!response.ok) throw new Error('Erreur lors de la récupération des données');
    // return await response.json();
    
    // Pour l'instant, on simule une réponse
    console.log(`Fetching sensor data for child ${childId}, device ${deviceId}`);
    return simulateSensorData();
  } catch (error) {
    console.error("Erreur lors de la récupération des données capteurs:", error);
    toast.error("Impossible de récupérer les données des capteurs");
    return {};
  }
};

// Fonction pour envoyer des commandes à l'ESP32 via le backend
export const sendCommand = async (deviceId: string, command: string, payload?: any): Promise<boolean> => {
  try {
    // En production, vous feriez un appel API réel
    // const response = await fetch(`${API_BASE_URL}/api/devices/${deviceId}/command`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ command, payload })
    // });
    // if (!response.ok) throw new Error('Erreur lors de l\'envoi de la commande');
    // return true;
    
    // Pour l'instant, on simule une réponse
    console.log(`Sending command ${command} to device ${deviceId}`, payload);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la commande:", error);
    toast.error("Impossible d'envoyer la commande à l'appareil");
    return false;
  }
};

// Fonction pour vérifier le statut du firmware
export const checkFirmwareStatus = async (deviceId: string): Promise<FirmwareStatus> => {
  try {
    // En production, vous feriez un appel API réel
    // const response = await fetch(`${API_BASE_URL}/api/devices/${deviceId}/status`);
    // if (!response.ok) throw new Error('Erreur lors de la vérification du statut');
    // return await response.json();
    
    // Pour l'instant, on simule une réponse
    return {
      version: "1.2.4",
      batteryLevel: 78,
      lastSync: new Date(),
      isConnected: true
    };
  } catch (error) {
    console.error("Erreur lors de la vérification du statut du firmware:", error);
    return {
      version: "inconnu",
      batteryLevel: 0,
      lastSync: new Date(),
      isConnected: false
    };
  }
};

// Fonction de simulation pour le développement
const simulateSensorData = (): SensorData => {
  // Simulation de valeurs réalistes avec une petite variation
  return {
    heartRate: Math.floor(75 + Math.random() * 20),
    temperature: parseFloat((36 + Math.random()).toFixed(1)),
    sleepQuality: Math.floor(70 + Math.random() * 30),
    activity: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
    deviceId: "ESP32_DEMO"
  };
};
