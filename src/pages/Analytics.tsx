
import Navbar from "@/components/layout/Navbar";

const Analytics = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Analyse émotionnelle</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Historique des émotions</h2>
            <p className="text-muted-foreground">
              Cette section affichera les graphiques détaillés de l'évolution émotionnelle.
            </p>
          </div>
          <div className="bg-background border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Détection émotionnelle</h2>
            <p className="text-muted-foreground">
              Analyse des motifs émotionnels et des indicateurs de bien-être de l'enfant.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Analytics;
