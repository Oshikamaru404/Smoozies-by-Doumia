
import Navbar from "@/components/layout/Navbar";
import AddChildForm from "@/components/auth/AddChildForm";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AddChild = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Ajouter un enfant</h1>
        </div>
        
        <AddChildForm />
      </main>
    </>
  );
};

export default AddChild;
