"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Cart } from "./cart";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Package, LogOut, ChevronDown } from "lucide-react";

export const Header = () => {
  const { data: session } = authClient.useSession();

  const initials =
    (session?.user?.name?.split(" ")?.[0]?.[0] ?? "") +
    (session?.user?.name?.split(" ")?.[1]?.[0] ?? "");

  return (
    <header
      className="bg-background/80 relative sticky top-0 z-50 mb-8 border-b backdrop-blur"
      role="banner"
    >
      {/* container responsivo */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* AVATAR / LOGIN (desktop) */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-muted focus-visible:ring-ring flex h-auto items-center gap-3 rounded-full p-1.5 pr-3 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Abrir menu do usuário"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.image as string | undefined}
                    />
                    <AvatarFallback>{initials || "US"}</AvatarFallback>
                  </Avatar>

                  <span className="hidden text-sm font-medium sm:block">
                    {session?.user?.name}
                  </span>

                  <ChevronDown className="text-muted-foreground hidden h-4 w-4 sm:block" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="border-border w-64 shadow-lg"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 py-1">
                    <p className="line-clamp-1 text-sm leading-none font-semibold">
                      {session?.user?.name}
                    </p>
                    <p className="text-muted-foreground line-clamp-1 text-xs leading-none">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer p-2">
                    <Link href="/account" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Minha conta</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer p-2">
                    <Link href="/my-orders" className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Meus pedidos</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => authClient.signOut()}
                  className="group cursor-pointer p-2 text-sm text-red-500 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link href="/authentication">
                <LogInIcon className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>
          )}
        </div>

        {/* LOGO */}
        <Link
          href="/"
          aria-label="Ir para a página inicial"
          className="shrink-0"
        >
          <Image
            src="/Logo.png"
            alt="BEWEAR"
            width={120}
            height={28}
            className="h-auto w-[100px] sm:w-[120px]"
            priority
          />
        </Link>

        {/* AÇÕES */}
        <div className="flex items-center gap-2">
          {/* MENU MOBILE (até md/lg) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-4 space-y-6">
                {/* bloco de usuário */}
                <div className="px-1">
                  {session?.user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>{initials || "US"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="line-clamp-1 font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground line-clamp-1 block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                        aria-label="Sair"
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">Olá. Faça seu login!</h2>
                      <Button
                        size="icon"
                        asChild
                        variant="outline"
                        aria-label="Ir para login"
                      >
                        <Link href="/authentication">
                          <LogInIcon />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>

                {/* navegação do menu mobile */}
                <nav className="space-y-2" aria-label="Navegação do menu">
                  <Link
                    href="/novidades"
                    className="hover:bg-accent block rounded-md px-2 py-2"
                  >
                    Novidades
                  </Link>
                  <Link
                    href="/categorias"
                    className="hover:bg-accent block rounded-md px-2 py-2"
                  >
                    Categorias
                  </Link>
                  <Link
                    href="/promocoes"
                    className="hover:bg-accent block rounded-md px-2 py-2"
                  >
                    Promoções
                  </Link>
                  <Link
                    href="/suporte"
                    className="hover:bg-accent block rounded-md px-2 py-2"
                  >
                    Suporte
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* CARRINHO sempre visível */}
          <Cart />
        </div>
      </div>
    </header>
  );
};
