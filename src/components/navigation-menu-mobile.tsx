"use client";
import { useMobileMenuStore } from "@/providers/store";
import Link from "next/link";

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

export default function NavigationMenuMobileComponent() {
  const {mobileOpen, setMobileOpen} = useMobileMenuStore();

  return (
      <div className="fixed z-50 py-8 bg-red-950 flex flex-col w-full">
        <nav className="flex flex-col gap-4">
          {menus.map((menu) =>
            menu.components ? (
              <div key={menu.title} className="w-full">
                <span className="block text-white font-bold px-4 py-2">{menu.title}</span>
                <ul>
                  {menu.components.map((component: any) => (
                    <li key={component.title}>
                      <Link
                        href={component.href}
                        className="block text-white px-8 py-2"
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
  );
}
