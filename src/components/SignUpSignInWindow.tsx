import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";

import disableScroll from 'disable-scroll'
import {SignUpWindow} from "./SignUpWindow";
import {SignInWindow} from "./SignInWindow";

export enum RegistrationWindowState {
    signInState = "sign-in-window",
    signUpState = "sign-up-window",
    resetPasswordState = "reset-password-window"
}

export const SignUpSignInWindow = () => {
    const [registrationWindowState, setRegistrationWindowState] = useState(RegistrationWindowState.signInState)
    const {registrationWindowActive, setRegistrationWindowActive} = useContext(AppContext);
    const [registrationWindowVisibility, setRegistrationWindowVisibility] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    useEffect(() => {
        if (registrationWindowActive) {
            setRegistrationWindowVisibility(true);
        } else {
            setTimeout(() => setRegistrationWindowVisibility(false), 300)
        }
    }, [registrationWindowActive]);

    useEffect(() => {
        setTimeout(() => {
            Array.from(document.getElementsByClassName("register-window-input")).forEach((element) => {
                (element as HTMLInputElement).value = "";
            })
        }, 300)
    }, [registrationWindowActive, registrationWindowState])
    useEffect(() => {
        registrationWindowActive ? disableScroll.on() : disableScroll.off();
        setTimeout(() => setRegistrationWindowState(RegistrationWindowState.signInState), 300)
    }, [registrationWindowActive])
    useEffect(() => {
        const inputs = Array.from(document.getElementsByClassName("password-visibility"));
        inputs.forEach((value) => {
            (value as HTMLInputElement).type = (value as HTMLInputElement).type === "password" ? "text" : "password";
        });

    }, [passwordVisibility])

    const registrationWindows = new Map<RegistrationWindowState, JSX.Element>();
    registrationWindows.set(RegistrationWindowState.signInState,
        <SignInWindow
            registrationWindowState={registrationWindowState}
            setRegistrationWindowState={setRegistrationWindowState}
            registrationWindowActive={registrationWindowActive}
            setRegistrationWindowActive={setRegistrationWindowActive}
            passwordVisibility={passwordVisibility}
            setPasswordVisibility={setPasswordVisibility}
        />
    )
    registrationWindows.set(RegistrationWindowState.signUpState,
        <SignUpWindow
            registrationWindowState={registrationWindowState}
            setRegistrationWindowState={setRegistrationWindowState}
            registrationWindowActive={registrationWindowActive}
            setRegistrationWindowActive={setRegistrationWindowActive}
            passwordVisibility={passwordVisibility}
            setPasswordVisibility={setPasswordVisibility}
        />)

    return (
        <>
            {<div className={`sign-up-sign-in-window-wrapper ${registrationWindowActive ? 'active' : ''}`}>
                {registrationWindowVisibility&&registrationWindows.get(registrationWindowState)}
            </div>}
        </>
    )
}