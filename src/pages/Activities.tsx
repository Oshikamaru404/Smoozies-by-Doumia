
import Navbar from "@/components/layout/Navbar";

const Activities = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Activités</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Activités récentes</h2>
            <p className="text-muted-foreground">
              Historique des interactions récentes avec la peluche.
            </p>
          </div>
          <div className="bg-background border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Programmes ludiques</h2>
            <p className="text-muted-foreground">
              Découvrez les programmes disponibles: histoires interactives, apprentissage du calcul et jeux psychomoteurs.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Activities;
