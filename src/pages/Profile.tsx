
import Navbar from "@/components/layout/Navbar";
import { User } from "lucide-react";

const Profile = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Profil Parent</h1>
          <p className="text-muted-foreground">parent@example.com</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
            <p className="text-muted-foreground">
              Gérez vos informations de profil et vos paramètres de confidentialité.
            </p>
          </div>
          <div className="bg-background border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Enfants</h2>
            <p className="text-muted-foreground">
              Gérez les profils de vos enfants et leurs peluches connectées.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
