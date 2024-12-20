'use client'

import { Squash as Hamburger } from 'hamburger-react'
import { Dispatch, SetStateAction } from 'react'

interface HamburgerMenuProps {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export default function HamburgerMenu({
  menuOpen,
  setMenuOpen,
}: HamburgerMenuProps) {
  return (
    <Hamburger
      toggled={menuOpen}
      toggle={setMenuOpen}
      color='black'
      size={20}
    />
  )
}
