import {matchPath, NavLink, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {ReactComponent as LightLogo} from "../images/svg/light-icon.svg";
import {ReactComponent as DarkLogo} from "../images/svg/dark-icon.svg";
import {ReactComponent as LogInIcon} from "../images/svg/log-in-icon.svg";
import {ReactComponent as LogOutIcon} from "../images/svg/log-out-icon.svg";
import {ReactComponent as RightArrowIcon} from "../images/svg/right-arrow-icon.svg";
import {ReactComponent as LeftArrowIcon} from "../images/svg/left-arrow-icon.svg";
import {ReactComponent as SunIcon} from "../images/svg/sun-icon.svg";
import {ReactComponent as MoonIcon} from "../images/svg/moon-icon.svg";
import {ReactComponent as UAIcon} from "../images/svg/ua-flag-icon.svg";
import {ReactComponent as ENIcon} from "../images/svg/en-flag-icon.svg";


import {PopupMenu} from "./PopupMenu";
import {AppContext} from "../App";
import {SignUpSignInWindow} from "./SignUpSignInWindow";
import {NavSearchPanel} from "./NavSearchPanel";
import {ConfirmationWindow} from "./ConfirmationWindow";
import {NavigationLink} from "./NavigationLink";
import {useTranslation} from "./Language";

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


export const Navigation = (props: any) => {
    const {
        darkThemeActive,
        setDarkThemeActive,
        registrationWindowActive,
        setRegistrationWindowActive,
        user,
        setUser
    } = useContext(AppContext);
    const {language, setLanguage, translate} = useTranslation()

    const isMenuPageActive = (path: string) => {
        return !!matchPath({path: `/${path}/*`}, document.location.pathname)
    }
    const [modalWindowState, setModalWindowState] = useState(PopupMenuState.globalState);
    const [burgerMenuState, setBurgerMenuState] = useState(BurgerMenuState.navigationState);
    const [logoutConfirmation, setLogOutConfirmation] = useState(false)
    const navigate = useNavigate();
    const profilePopupWidows = new Map<PopupMenuState, JSX.Element>();
    profilePopupWidows.set(PopupMenuState.globalState, <div className="menu-dropdown-option-list">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.themeState)}
        >
            {translate("Theme")}
            <RightArrowIcon/>
        </div>
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.languageState)}
        >
            {translate("Language")}
            <RightArrowIcon/>
        </div>
        {user && <div
            className="menu-dropdown-option-list-item close-popup-element"
            onClick={() => {
                navigate("/my-builds")
            }}
        >
            {translate("My builds")}
        </div>}
        {user && <div
            className="menu-dropdown-option-list-item close-popup-element"
            onClick={() => {
                navigate("/favorites")
            }}
        >
            {translate("Favorites")}
        </div>}
        <div className="menu-dropdown-option-list-item close-popup-element"
             onClick={() => {
                 if (user === null) {
                     setRegistrationWindowActive(true)
                 } else {
                     setLogOutConfirmation(true)
                 }
             }}
        >
            {user === null ? translate("Log in") : translate("Log out")}
            {user === null ? <LogInIcon/> : <LogOutIcon/>}
        </div>
    </div>)
    profilePopupWidows.set(PopupMenuState.themeState, <div className="menu-dropdown-option-list ">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.globalState)}
        >
            <LeftArrowIcon/>
            {translate("Back")}
        </div>
        <div
            className={"menu-dropdown-option-list-item" + (!darkThemeActive ? " selected-item" : "")}
            onClick={() => setDarkThemeActive(false)}
        >
            {translate("Light")}
            <SunIcon/>
        </div>
        <div className={"menu-dropdown-option-list-item" + (darkThemeActive ? " selected-item" : "")}
             onClick={() => setDarkThemeActive(true)}
        >
            {translate("Dark")}
            <MoonIcon className={"icon"}/>
        </div>
    </div>)
    profilePopupWidows.set(PopupMenuState.languageState, <div className="menu-dropdown-option-list ">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => setModalWindowState(PopupMenuState.globalState)}
        >
            <LeftArrowIcon/>
            {translate("Back")}
        </div>
        <div className={"menu-dropdown-option-list-item" + (language === "ua" ? " selected-item" : "")} onClick={() => setLanguage("ua")}>
            UA
            <UAIcon/>
        </div>
        <div className={"menu-dropdown-option-list-item" + (language === "en" ? " selected-item" : "")} onClick={() => setLanguage("en")}>
            EN
            <ENIcon/>
        </div>
    </div>)

    const burgerMenuWindows = new Map<BurgerMenuState, JSX.Element>();
    burgerMenuWindows.set(BurgerMenuState.navigationState,
        <div className="menu-dropdown-option-list">
            <div className={'menu-dropdown-option-list-item ' + (isMenuPageActive('components') ? 'selected-item' : '')}
                 onClick={() => {
                     navigate('/components')
                 }}
            >
                Components
            </div>
            <div
                className={'menu-dropdown-option-list-item ' + (isMenuPageActive('create-build') ? 'selected-item' : '')}
                onClick={() => navigate('/create-build')}
            >
                Create build
            </div>
            <div
                className={'menu-dropdown-option-list-item ' + (isMenuPageActive('search') ? 'selected-item' : '')}
                onClick={() => navigate('/search')}
            >
                Search
            </div>
            <div className={'menu-dropdown-option-list-item'}
                //TODO: fix bug (maybe fixed)
                 onClick={() => {
                     setTimeout(() => setBurgerMenuState(BurgerMenuState.profileState), 0);
                 }}>
                {user === null ? translate("Profile") : user.username}
            </div>
        </div>);
    burgerMenuWindows.set(BurgerMenuState.profileState, <div className="menu-dropdown-option-list">
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => {
                setBurgerMenuState(BurgerMenuState.navigationState);
            }}
        >
            <LeftArrowIcon/>
            Back
        </div>
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => {
                setBurgerMenuState(BurgerMenuState.themeState);
            }}
        >
            Theme
            <RightArrowIcon/>
        </div>
        <div
            className="menu-dropdown-option-list-item"
            onClick={() => {
                setBurgerMenuState(BurgerMenuState.languageState);
            }}
        >
            Language
            <RightArrowIcon/>
        </div>
        <div className="menu-dropdown-option-list-item"
             onClick={() => {
                 if (user === null) {
                     setRegistrationWindowActive(true)
                 } else {
                     setLogOutConfirmation(true)
                 }
             }}
        >
            {user === null ? "Log in" : "Log out"}
            {user === null ? <LogInIcon/> : <LogOutIcon/>}
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
        <>
            <div className={"header"}>
                <div className={"navigation"}>
                    <NavLink to={'/components'}>
                        <div className="logo">{darkThemeActive ? <DarkLogo/> : <LightLogo/>}</div>
                    </NavLink>
                    <NavigationLink link={'/components'}>
                        {translate("Components")}
                    </NavigationLink>
                    <NavigationLink link={'/create-build'}>
                        {translate("Create build")}
                    </NavigationLink>
                    {/*<NavigationLink link={'/guides'}>*/}
                    {/*    Guides*/}
                    {/*</NavigationLink>*/}
                    <NavSearchPanel/>
                    <div className="drop-down">
                        <div className={"drop-down-button"} id={"drop-down-button-id"}>
                            {user === null ? translate("Profile") : user.username}
                        </div>
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
            <ConfirmationWindow
                message={"Are you sure you want to"}
                action={"log out"}
                visibility={logoutConfirmation}
                setVisibility={setLogOutConfirmation}
                confirmationFunction={() => setUser(null)}
                rejectionFunction={() => {
                }}
            />
        </>
    )
}