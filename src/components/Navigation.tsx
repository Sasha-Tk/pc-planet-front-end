import {Link} from "react-router-dom";
import React, {createContext, useState} from "react";
import {ReactComponent as Logo} from "../images/svg/light-icon.svg";
import {ReactComponent as MenuBurgerIcon} from "../images/svg/menu-burger-icon.svg";
import {NavigationLinks} from "./NavigationLinks";

export const NavigationContext = createContext<any>(null);
export const Navigation = () => {

    const [profileWindowVisible, setProfileWindowVisible] = useState(false);
    const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
    return (
        <NavigationContext.Provider
            value={{profileWindowVisible, setProfileWindowVisible, burgerMenuVisible, setBurgerMenuVisible}}>
            <div className={"header"}>
                <div className={"navigation"}>
                    <Link to={'/home'}>
                        <Logo/>
                    </Link>
                    <NavigationLinks
                        profileWindowVisible={profileWindowVisible}
                        setProfileWindowVisible={setProfileWindowVisible}
                    />
                    <div className="burger-menu">
                        <div className="burger-menu-button skip-class"
                             onClick={() => setBurgerMenuVisible(prevState => !prevState)}>
                            <MenuBurgerIcon/>
                        </div>
                        <div
                            className={burgerMenuVisible ?
                                "burger-menu-navigation-modal-window burger-menu-navigation-modal-window-visible" :
                                "burger-menu-navigation-modal-window"}>
                            <div className="burger-menu-content">
                                <NavigationLinks
                                    profileWindowVisible={profileWindowVisible}
                                    setProfileWindowVisible={setProfileWindowVisible}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </NavigationContext.Provider>
    )
}