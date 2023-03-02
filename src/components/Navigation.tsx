import {Link, NavLink} from "react-router-dom";
import React, {createContext, useContext, useState} from "react";
import {ReactComponent as LightLogo} from "../images/svg/light-icon.svg";
import {ReactComponent as DarkLogo} from "../images/svg/dark-icon.svg";
import {ReactComponent as LogInIcon} from "../images/svg/log-in-icon.svg";
import {ReactComponent as RightArrowIcon} from "../images/svg/right-arrow-icon.svg";
import {ReactComponent as LeftArrowIcon} from "../images/svg/left-arrow-icon.svg";
import {ReactComponent as SunIcon} from "../images/svg/sun-icon.svg";
import {ReactComponent as MoonIcon} from "../images/svg/moon-icon.svg";
import {ReactComponent as UAIcon} from "../images/svg/ua-flag-icon.svg";
import {ReactComponent as ENIcon} from "../images/svg/en-flag-icon.svg";
import {ReactComponent as MenuBurgerIcon} from "../images/svg/menu-burger-icon.svg";
import {PopupMenu} from "./PopupMenu";
import {AppContext} from "../App";
import {SignUpSignInWindow} from "./SignUpSignInWindow";

enum BurgerMenuState {
    navigationState,
    profileState,
    themeState,
    languageState
}

enum PopupMenuState {
    globalState,
    languageState,
    themeState
}


export const Navigation = () => {
    const {
        darkThemeActive,
        setDarkThemeActive,
        registrationWindowActive,
        setRegistrationWindowActive
    } = useContext(AppContext);

    const [modalWindowState, setModalWindowState] = useState(PopupMenuState.globalState);
    const [burgerMenuState, setBurgerMenuState] = useState(BurgerMenuState.navigationState);
    const profilePopupWidows = new Map<PopupMenuState, JSX.Element>();
    profilePopupWidows.set(PopupMenuState.globalState, <div className="menu-dropdown-option-list">
        <div
            className="menu-dropdown-option-list-item "
            onClick={() => setModalWindowState(PopupMenuState.themeState)}
        >
            Theme
            <RightArrowIcon/>
        </div>
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.languageState)}
        >
            Language
            <RightArrowIcon/>
        </div>
        <div className="menu-dropdown-option-list-item close-popup-element"
             onClick={() => setRegistrationWindowActive(true)}>
            Log in
            <LogInIcon/>
        </div>
    </div>)
    profilePopupWidows.set(PopupMenuState.themeState, <div className="menu-dropdown-option-list ">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.globalState)}
        >
            <LeftArrowIcon/>
            Back
        </div>
        <div
            className={"menu-dropdown-option-list-item" + (!darkThemeActive ? " selected-item" : "")}
            onClick={() => setDarkThemeActive(false)}
        >
            Light
            <SunIcon/>
        </div>
        <div className={"menu-dropdown-option-list-item" + (darkThemeActive ? " selected-item" : "")}
             onClick={() => setDarkThemeActive(true)}
        >
            Dark
            <MoonIcon className={"icon"}/>
        </div>
    </div>)
    profilePopupWidows.set(PopupMenuState.languageState, <div className="menu-dropdown-option-list ">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.globalState)}
        >
            <LeftArrowIcon/>
            Back
        </div>
        <div className="menu-dropdown-option-list-item">
            UA
            <UAIcon/>
        </div>
        <div className="menu-dropdown-option-list-item">
            EN
            <ENIcon/>
        </div>
    </div>)

    const burgerMenuWindows = new Map<BurgerMenuState, JSX.Element>();
    burgerMenuWindows.set(BurgerMenuState.navigationState, <div className="menu-dropdown-option-list flex-center">
        <div className={'menu-dropdown-option-list-item'}>
            <NavLink to={'/components'} className={props => props.isActive ? 'link active-link' : 'link'}>
                Components
            </NavLink>
        </div>
        <div className={'menu-dropdown-option-list-item'}>
            <NavLink to={'/create-build'} className={props => props.isActive ? 'link active-link' : 'link'}>
                Create build
            </NavLink>
        </div>
        <div className={'menu-dropdown-option-list-item'}>
            <NavLink to={'/guides'} className={props => props.isActive ? 'link active-link' : 'link'}>
                Guides
            </NavLink>
        </div>
        <div className={'menu-dropdown-option-list-item'}
             onClick={() => {
                 setTimeout(() => setBurgerMenuState(BurgerMenuState.profileState), 0);
             }}>
            Profile
        </div>
    </div>);
    burgerMenuWindows.set(BurgerMenuState.profileState, <div className="menu-dropdown-option-list">
        <div
            className="menu-dropdown-option-list-item"
            //TODO: fix bug
            onClick={() => {
                setTimeout(() => setBurgerMenuState(BurgerMenuState.navigationState), 0);
            }}
            // onClick={() => {
            //     setBurgerMenuState(BurgerMenuState.navigationState);
            // }}
        >
            <LeftArrowIcon/>
            Back
        </div>
        <div
            className="menu-dropdown-option-list-item "
            onClick={() => {
                setTimeout(() => setBurgerMenuState(BurgerMenuState.themeState), 0);
            }}
        >
            Theme
            <RightArrowIcon/>
        </div>
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => {
                setTimeout(() => setBurgerMenuState(BurgerMenuState.languageState), 0);
            }}
        >
            Language
            <RightArrowIcon/>
        </div>
        <div className="menu-dropdown-option-list-item close-popup-element"
             onClick={() => setRegistrationWindowActive(true)}
        >
            Log in
            <LogInIcon/>
        </div>
    </div>);
    burgerMenuWindows.set(BurgerMenuState.themeState, <div className="menu-dropdown-option-list ">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setBurgerMenuState(BurgerMenuState.profileState)}
        >
            <LeftArrowIcon/>
            Back
        </div>
        <div
            className={"menu-dropdown-option-list-item" + (!darkThemeActive ? " selected-item" : "")}
            onClick={() => setDarkThemeActive(false)}
        >
            Light
            <SunIcon/>
        </div>
        <div className={"menu-dropdown-option-list-item" + (darkThemeActive ? " selected-item" : "")}
             onClick={() => setDarkThemeActive(true)}
        >
            Dark
            <MoonIcon className={"icon"}/>
        </div>
    </div>);
    burgerMenuWindows.set(BurgerMenuState.languageState, <div className="menu-dropdown-option-list ">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setBurgerMenuState(BurgerMenuState.profileState)}
        >
            <LeftArrowIcon/>
            Back
        </div>
        <div className="menu-dropdown-option-list-item">
            UA
            <UAIcon/>
        </div>
        <div className="menu-dropdown-option-list-item">
            EN
            <ENIcon/>
        </div>
    </div>);
    return (
        <div className={"header"}>
            <div className={"navigation"}>
                <NavLink to={'/home'}>
                    <div className="logo">{darkThemeActive ? <DarkLogo/> : <LightLogo/>}</div>
                </NavLink>
                <NavLink to={'/components'} className={props => props.isActive ? 'active-link' : ''}>
                    <div className={'link'}>Components</div>
                </NavLink>
                <NavLink to={'/create-build'} className={props => props.isActive ? 'active-link' : ''}>
                    <div className={'link'}>Create build</div>
                </NavLink>
                <NavLink to={'/guides'} className={props => props.isActive ? 'active-link' : ''}>
                    <div className={'link'}>Guides</div>
                </NavLink>

                <div className="drop-down">
                    <div className={"drop-down-button"} id={"drop-down-button-id"}>Profile</div>
                    <div className="menu-drop-down">
                        <PopupMenu
                            openButtonComponentID={"drop-down-button-id"}
                            visibleClass={"menu-drop-down-visible"}
                            contentClass={"menu-drop-down-wrapper"}
                            defaultWindow={PopupMenuState.globalState}
                            setDefaultWindow={setModalWindowState}
                            closeElementClass={"close-popup-element"}
                        >
                            {profilePopupWidows.get(modalWindowState)}
                        </PopupMenu>
                    </div>
                </div>
                <div className="burger">
                    <div className="burger-menu-button" id="burger-menu-button-id">
                        <span id="burger-first-line"/>
                        <span id="burger-second-line"/>
                        <span id="burger-third-line"/>
                        <span id="burger-fourth-line"/>
                    </div>
                    <div className="burger-menu">
                        <PopupMenu
                            openButtonComponentID={"burger-menu-button-id"}
                            visibleClass={"burger-menu-visible"}
                            contentClass={"burger-menu-wrapper"}
                            defaultWindow={BurgerMenuState.navigationState}
                            setDefaultWindow={setBurgerMenuState}
                            closeElementClass={"close-popup-element"}
                        >
                            {burgerMenuWindows.get(burgerMenuState)}
                        </PopupMenu>
                    </div>
                </div>
            </div>
            <SignUpSignInWindow></SignUpSignInWindow>
        </div>
    )
}