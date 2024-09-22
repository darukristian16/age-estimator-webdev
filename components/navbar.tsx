'use client'
import React from "react";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import {Image} from "@nextui-org/react"

export const Navbar = () => {
  const [isMenuOpen] = React.useState(false);
  const menuItems = [
    "Home",
    "How it Works",
    "About",
  ];

  return (
    <NextUINavbar className="light" maxWidth="xl">
      <NavbarContent>
        <NavbarBrand>
          <Image 
            className="h-10 flex justify-start items-center gap-1"
            src="/image/logo.png"
            alt="Logo Telkom Indonesia"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem isActive>
          <Link className='font-bold' color="primary" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="hover:text-primary hover:font-medium">
            How it Works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="hover:text-primary hover:font-medium">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 0 ? "primary" : "foreground"
              }
              className="w-full"
            href={item === "Home" ? "/" : "#"}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}