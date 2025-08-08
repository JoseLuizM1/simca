"use client";
import * as React from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const menus: { title: string; href: string; components?: any }[] = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Sobre nós",
    href: "/",
    components: [
      {
        title: "Horários & Contatos",
        href: "/horarios-contatos",
      },
      {
        title: "Nossa História",
        href: "/nossa-historia",
      },
      {
        title: "Direções & Comissões",
        href: "/direcoes-comissoes",
      },
    ],
  },
  {
    title: "Serviços",
    href: "/",
    components: [
      {
        title: "Convênio Mercadão dos Óculos",
        href: "/convenio",
      },
      {
        title: "Jurídico",
        href: "/juridico",
      },
      {
        title: "Plano Odontológico",
        href: "/plano-odontologico",
      },
    ],
  },
  {
    title: "Mural",
    href: "/mural",
  },
  {
    title: "Notícias",
    href: "/noticias",
  },
  {
    title: "Precatórios",
    href: "/precatorio",
  },
];

export default function NavigationMenuComponent() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav>
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem
                key={menu.title}
                className="text-white hover:text-white bg-none"
              >
                {menu.components ? (
                  <>
                    <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10">
                      <ul className="grid w-[200px] gap-1 p-2">
                        {menu.components.map((component: any) => (
                          <li key={component.title}>
                            <NavigationMenuLink asChild className="text-red-700 hover:text-red-700">
                              <Link href={component.href} className="flex gap-2">
                                {component.title}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link href={menu.href} className="flex items-center gap-2">
                      {menu.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Abrir menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-white p-2"
        >
          {mobileOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
              className="text-white"
            >
              <XIcon size={28} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center gap-4">
            {menus.map((menu) =>
              menu.components ? (
                <div key={menu.title} className="w-full">
                  <span className="block text-white font-bold px-4 py-2">{menu.title}</span>
                  <ul>
                    {menu.components.map((component: any) => (
                      <li key={component.title}>
                        <Link
                          href={component.href}
                          className="block text-red-700 px-8 py-2"
                          onClick={() => setMobileOpen(false)}
                        >
                          {component.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={menu.title}
                  href={menu.href}
                  className="block text-white px-4 py-2 font-bold"
                  onClick={() => setMobileOpen(false)}
                >
                  {menu.title}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </nav>
  );
}
