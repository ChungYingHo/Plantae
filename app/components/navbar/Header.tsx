'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image
} from '@nextui-org/react'
import MetaIcon from './Meta'
import IgIcon from './Ig'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: '主頁', href: '/' },
    { name: '商場', href: '/store' },
    { name: '購物車', href: '/shopping_cart' },
    { name: '訂單查詢', href: '/order_info' },
    { name: 'Facebook', href: 'https://www.facebook.com/plantae.tw' },
    { name: 'Instagram', href: 'https://www.instagram.com/plantae_taiwan/' }
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <Logo /> */}
          <Image src="/plantae/logo.png" alt="PLANTAE" width={36} height={36} />
          <p className="text-foreground ml-1 font-bold">PLANTAE Taiwan</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color={pathname === '/' ? 'secondary' : 'foreground'} href="/">
            主頁
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/portfolio"
            aria-current="page"
            color={pathname === '/store' ? 'secondary' : 'foreground'}
          >
            商場
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={pathname === '/shopping_cart' ? 'secondary' : 'foreground'}
            href="/shopping_cart"
          >
            購物車
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={pathname === '/order_info' ? 'secondary' : 'foreground'}
            href="/order_info"
          >
            訂單查詢
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            isIconOnly
            as={Link}
            href="https://www.facebook.com/plantae.tw"
            target="_blank"
            variant="light"
            size="sm"
            className="p-1"
          >
            <MetaIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            as={Link}
            href="https://www.instagram.com/plantae_taiwan/"
            target="_blank"
            variant="light"
            size="sm"
            className="p-1"
          >
            <IgIcon />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link color="primary" className="w-full" href={item.href} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
