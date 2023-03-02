import React, {useState} from "react";
import {ReactComponent as MenuBurgerIcon} from "../images/svg/menu-burger-icon.svg";
import {PopupMenu} from "./PopupMenu";

export const BurgerMenu = (props:any) => {
    return (
        <div className="burger">
            <div id="burger-menu-button-id" className="burger-menu-button">
                <MenuBurgerIcon/>
            </div>
            <div className="burger-menu">
                <PopupMenu
                    openButtonComponentID={"burger-menu-button-id"}
                    visibleClass={"burger-menu-visible"}
                    contentClass={"burger-menu-wrapper"}
                >
                    {props.children}
                </PopupMenu>
            </div>
        </div>
    )
}