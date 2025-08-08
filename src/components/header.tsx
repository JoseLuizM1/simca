import NavigationMenuComponent from "./navigation-menu";

export default function Header() {
  return (
    <header className="w-full bg-red-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h2 className="font-bold text-white">SIMCA</h2>
        <NavigationMenuComponent />
      </div>
    </header>
  );
}