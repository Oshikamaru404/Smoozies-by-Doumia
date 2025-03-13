
import { Navbar } from "@/components/layout/Navbar";

const Settings = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
        <div className="bg-background border rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Paramètres du compte</h2>
          <p className="text-muted-foreground mb-4">
            Gérez vos informations personnelles et les paramètres de sécurité.
          </p>
        </div>
        <div className="bg-background border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Paramètres de la peluche</h2>
          <p className="text-muted-foreground mb-4">
            Configurez les paramètres de votre peluche PulcheCare.
          </p>
        </div>
      </main>
    </>
  );
};

export default Settings;
