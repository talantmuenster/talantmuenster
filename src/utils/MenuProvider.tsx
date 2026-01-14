'use client';

import { createContext, useContext, useState } from 'react';

type MenuContextType = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        open,
        openMenu: () => setOpen(true),
        closeMenu: () => setOpen(false),
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error('useMenu must be used inside MenuProvider');
  }
  return ctx;
}
