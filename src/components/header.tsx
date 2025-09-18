import NavigationMenuComponent from "./navigation-menu";

export default function Header() {
  return (
    <header className="w-full bg-red-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="font-bold text-white flex items-center">
          <img 
            src="logo-simca.avif" 
            alt="Logo SIMCA" 
            className="h-8"
          />
        </a>
        <NavigationMenuComponent />
      </div>
    </header>
  );
}