
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart2, 
  Settings, 
  Activity,
  Menu,
  X,
  LogOut,
  User,
  BookOpen
} from "lucide-react";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMobile]);

  const navItems = [
    { href: "/", label: "Tableau de bord", icon: <Home className="h-5 w-5" /> },
    { href: "/analytics", label: "Analyse émotionnelle", icon: <BarChart2 className="h-5 w-5" /> },
    { href: "/activities", label: "Activités", icon: <Activity className="h-5 w-5" /> },
    { href: "/parent-resources", label: "Ressources parents", icon: <BookOpen className="h-5 w-5" /> },
    { href: "/settings", label: "Paramètres", icon: <Settings className="h-5 w-5" /> },
  ];

  const NavLink = ({ href, label, icon, onClick }: { href: string, label: string, icon: React.ReactNode, onClick?: () => void }) => (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground transition-all hover:text-foreground",
        location.pathname === href && "bg-primary/10 text-primary font-medium"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg transition-all duration-200",
          scrolled && "shadow-sm border-b"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-primary rounded-full animate-pulse-gentle" />
              </div>
              <span className="font-medium text-lg hidden sm:inline-block">PulcheCare</span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="hidden sm:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 z-40 bg-background transition-transform duration-300 transform",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="pt-20 pb-6 px-6 flex flex-col h-full">
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  {...item} 
                  onClick={() => setIsOpen(false)} 
                />
              ))}
            </nav>
            <Button 
              variant="ghost" 
              className="justify-start px-4 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Se déconnecter
            </Button>
          </div>
        </div>
      )}
      
      {/* Spacer to prevent content from hiding under the navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
