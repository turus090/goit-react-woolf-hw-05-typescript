import React, { createContext, useMemo, useState, useContext } from "react";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

type SelectedMenu = {
  id: MenuIds;
};

type MenuSelected = {
  selectedMenu: SelectedMenu;
};

const MenuSelectedContext = createContext<MenuSelected | undefined>(undefined);

type MenuAction = {
  onSelectedMenu: (menu: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction | undefined>(undefined);

type PropsProvider = {
  children: React.ReactNode;
};

function MenuProvider({ children }: PropsProvider) {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu | undefined>(
    undefined
  );

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: (menu: SelectedMenu) => {
        setSelectedMenu(menu);
      },
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Menu[];
};

function MenuComponent({ menus }: PropsMenu) {
  const menuAction = useContext(MenuActionContext);
  const menuSelected = useContext(MenuSelectedContext);

  if (!menuAction || !menuSelected) return null;

  const { onSelectedMenu } = menuAction;
  const { selectedMenu } = menuSelected;

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu?.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
