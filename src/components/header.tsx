'use client';
import { useMobileMenuStore } from "@/providers/store";
import NavigationMenuComponent from "./navigation-menu";
import NavigationMenuMobileComponent from "./navigation-menu-mobile";

export default function Header() {
  const {mobileOpen, setMobileOpen} = useMobileMenuStore();

  return (
    <>
      <header className="w-full bg-red-900 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="font-bold text-white flex items-center">
            <img 
              src="simsim.png" 
              alt="Logo SIMCA" 
              className="h-10"
            />
          </a>
          <NavigationMenuComponent />
        </div>
      </header>

      {mobileOpen && (
        <NavigationMenuMobileComponent />
      )}
    </>
  );
}