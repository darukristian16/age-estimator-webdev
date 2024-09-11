import React from "react";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react"

export const Navbar = () => {
  return (
    <NextUINavbar className="light" shouldHideOnScroll maxWidth="xl">
      <NavbarBrand as="li" className="max-w-full">
        <Image 
            className="h-14 flex justify-start items-center gap-1"
            src="/image/logo.png"
            alt="Logo Telkom Indonesia"
        >
        </Image>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            How it Works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
