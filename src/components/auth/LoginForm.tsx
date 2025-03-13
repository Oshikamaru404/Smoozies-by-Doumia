
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // Simulate login request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      navigate("/");
    } catch (error) {
      setLoginError("Identifiants invalides. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // This would normally involve checking if biometric authentication is available
      // and then initiating the authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful biometric auth
      navigate("/");
    } catch (error) {
      setLoginError("L'authentification biométrique a échoué. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-soft overflow-hidden">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">
          Connexion
        </CardTitle>
        <CardDescription className="text-center">
          Connectez-vous pour accéder à votre espace parent
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loginError && (
          <Alert variant="destructive" className="animate-slide-up">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre adresse email"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Votre mot de passe"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button variant="link" className="px-0" size="sm">
                Mot de passe oublié?
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Ou continuer avec
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          type="button" 
          className="w-full"
          onClick={handleBiometricAuth}
          disabled={isLoading}
        >
          <Fingerprint className="mr-2 h-4 w-4" />
          Authentification biométrique
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Vous n'avez pas de compte?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/signup")}>
            Créer un compte
          </Button>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          En vous connectant, vous acceptez nos{" "}
          <Button variant="link" className="p-0 h-auto text-xs">
            conditions d'utilisation
          </Button>{" "}
          et notre{" "}
          <Button variant="link" className="p-0 h-auto text-xs">
            politique de confidentialité
          </Button>
          .
        </div>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
