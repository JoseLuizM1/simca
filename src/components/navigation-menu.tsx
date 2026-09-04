"use client";
import * as React from "react";
import Link from "next/link";
import { Download, MenuIcon, XIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useMobileMenuStore } from "@/providers/store";

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
  const {mobileOpen, setMobileOpen} = useMobileMenuStore();

  return (
    <nav className="flex items-center gap-4">
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

      {/* Download da planilha de precatórios */}
      <a
        href="/precatorio/retroativo.xlsx"
        download
        className="hidden md:inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-800 shadow transition hover:bg-red-50"
      >
        <Download size={16} />
        Planilha
      </a>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white p-2"
        >
          {mobileOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

    </nav>
  );
}
