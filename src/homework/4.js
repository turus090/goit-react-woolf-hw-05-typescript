"use strict1";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentApp = void 0;
var react_1 = require("react");
var noop_1 = require("lodash/noop");
var MenuSelectedContext = (0, react_1.createContext)({
    selectedMenu: { id: "" },
});
var MenuActionContext = (0, react_1.createContext)({
    onSelectedMenu: noop_1.default,
});
function MenuProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)({
        id: "",
    }), selectedMenu = _b[0], setSelectedMenu = _b[1];
    var menuContextAction = (0, react_1.useMemo)(function () { return ({
        onSelectedMenu: setSelectedMenu,
    }); }, []);
    var menuContextSelected = (0, react_1.useMemo)(function () { return ({
        selectedMenu: selectedMenu,
    }); }, [selectedMenu]);
    return (<MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>);
}
function MenuComponent(_a) {
    var menus = _a.menus;
    var onSelectedMenu = (0, react_1.useContext)(MenuActionContext).onSelectedMenu;
    var selectedMenu = (0, react_1.useContext)(MenuSelectedContext).selectedMenu;
    return (<>
      {menus.map(function (menu) { return (<div key={menu.id} onClick={function () { return onSelectedMenu({ id: menu.id }); }}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>); })}
    </>);
}
function ComponentApp() {
    var menus = [
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
    return (<MenuProvider>
      <MenuComponent menus={menus}/>
    </MenuProvider>);
}
exports.ComponentApp = ComponentApp;
