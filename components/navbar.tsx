'use client'
import React from "react";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import {Image} from "@nextui-org/react"
import { Home } from "lucide-react";

export const Navbar = () => {
  return (
    <NextUINavbar className="light" maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image 
            className="h-10 flex justify-start items-center gap-1"
            src="/image/logo.png"
            alt="Logo Telkom Indonesia"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/" color="foreground">
            <Home size={24} />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}