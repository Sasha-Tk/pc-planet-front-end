import React, {createContext, useContext, useEffect, useState} from "react";
import {NavigationContext} from "./Navigation";
import {ModalWindow} from "./ModalWindow";
import {ReactComponent as LogInIcon} from "../images/svg/log-in-icon.svg";
import {ReactComponent as RightArrowIcon} from "../images/svg/right-arrow-icon.svg";
import {ReactComponent as LeftArrowIcon} from "../images/svg/left-arrow-icon.svg";
import {ReactComponent as SunIcon} from "../images/svg/sun-icon.svg";
import {ReactComponent as MoonIcon} from "../images/svg/moon-icon.svg";
import {ReactComponent as UAIcon} from "../images/svg/ua-flag-icon.svg";
import {ReactComponent as ENIcon} from "../images/svg/en-flag-icon.svg";


export enum ModalWindowState {
    globalState,
    languageState,
    themeState
}


export const ProfileModalWindow = () => {
    const [modalWindowState, setModalWindowState] = useState(ModalWindowState.globalState);
    const {profileWindowVisible, setProfileWindowVisible} = useContext(NavigationContext);
    useEffect(() => {
        setTimeout(() => {
            setModalWindowState(ModalWindowState.globalState)
        }, 200);
    }, [profileWindowVisible])


    const array = [
        <div className="modal-window-content ">
            <div
                className="modal-window-content-item skip-class"
                onClick={() => setModalWindowState(ModalWindowState.languageState)}
            >
                Theme
                <RightArrowIcon/>
            </div>
            <div
                className="modal-window-content-item skip-class"
                onClick={() => setModalWindowState(ModalWindowState.themeState)}
            >
                Language
                <RightArrowIcon/>
            </div>
            <div className="modal-window-content-item">
                Log in
                <LogInIcon/>
            </div>
        </div>,

        <div className="modal-window-content ">
            <div
                className="modal-window-content-item skip-class"
                onClick={() => setModalWindowState(ModalWindowState.globalState)}
            >
                <LeftArrowIcon/>
                Back
            </div>
            <div
                className="modal-window-content-item skip-class"

            >
                Light
                <SunIcon/>
            </div>
            <div className="modal-window-content-item skip-class">
                Dark
                <MoonIcon className={"icon"}/>
            </div>
        </div>,

        <div className="modal-window-content ">
            <div
                className="modal-window-content-item skip-class"
                onClick={() => setModalWindowState(ModalWindowState.globalState)}
            >
                <LeftArrowIcon/>
                Back
            </div>
            <div className="modal-window-content-item skip-class">
                UA
                <UAIcon/>
            </div>
            <div className="modal-window-content-item skip-class">
                EN
                <ENIcon/>
            </div>
        </div>

    ]

    return (<ModalWindow width={"250px"}
                         isVisible={profileWindowVisible}
                         setVisibility={setProfileWindowVisible}
                         notClosingElementsClass={'skip-class'}>
        {array[modalWindowState]}
    </ModalWindow>)
}