import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {ReactComponent as EyeIcon} from "../images/svg/eye.svg";
import {ReactComponent as OffEyeIcon} from "../images/svg/eye-off.svg";
import disableScroll from 'disable-scroll'

enum RegistrationWindowState {
    signInState,
    signUpState,
    resetPasswordState
}

export const SignUpSignInWindow = () => {
    const [registrationWindowState, setRegistrationWindowState] = useState(RegistrationWindowState.signInState)
    const {registrationWindowActive, setRegistrationWindowActive} = useContext(AppContext);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    useEffect(() => {
        registrationWindowActive ? disableScroll.on() : disableScroll.off();

    }, [registrationWindowActive])
    useEffect(() => {
        const input = document.getElementById("password-input") as HTMLInputElement;
        if (input) {
            input.type = input.type === "password" ? "text" : "password";
        }
    }, [passwordVisibility])

    const registrationWindows = new Map<RegistrationWindowState, JSX.Element>();
    registrationWindows.set(RegistrationWindowState.signInState,
        <>
            <div className={"close-sign-in-window"} onClick={() => setRegistrationWindowActive(false)}>
                <span id={"close-button-first-line"}></span>
                <span id={"close-button-second-line"}></span>
            </div>
            <p className={"register-window-title"}>Log in</p>
            <form className={"sign-in-form"}>
                <div className="email-input">
                    <input className={"sign-in-input"} id={"email-input"} type={"email"} placeholder={"Email"}/>
                </div>
                <div className="password-input">
                    <input className={"sign-in-input"}
                           id={"password-input"} type={"password"}
                           placeholder={"Password"}/>
                    <div className="eye-icon"
                         onClick={() => setPasswordVisibility(prevState => !prevState)}>
                        {passwordVisibility ? <EyeIcon/> : <OffEyeIcon/>}
                    </div>
                </div>
                <p className={"forgot-password-link"}>Forgot your password?</p>
                <button className={"continue-registration-button"}>Log in</button>
            </form>
            <div className={"change-register-window"}>
                <p>Not a member?</p>
                <span className={"change-register-window-button"}>Sign Up</span>
            </div>
        </>
    )
    registrationWindows.set(RegistrationWindowState.signUpState,
        <>
            <div className={"close-sign-in-window"} onClick={() => setRegistrationWindowActive(false)}>
                <span id={"close-button-first-line"}></span>
                <span id={"close-button-second-line"}></span>
            </div>
            <p className={"register-window-title"}>Sign up</p>
            <div className="email-input">
                <input className={"sign-in-input"} id={"email-input"} type={"email"} placeholder={"Email"}/>
            </div>
            <div className="user-name-input">
                <input className={"sign-in-input"} id={"user-name-input"} type={"text"} placeholder={"User name"}/>
            </div>
            <div className="password-input">
                <input className={"sign-in-input"}
                       id={"password-input"} type={"password"}
                       placeholder={"Password"}/>
                <div className="eye-icon"
                     onClick={() => setPasswordVisibility(prevState => !prevState)}>
                    {passwordVisibility ? <EyeIcon/> : <OffEyeIcon/>}
                </div>
            </div>
            <button className={"change-register-window"}>Sign up</button>
        </>)
    return (
        registrationWindowActive &&
        <div className={"sign-up-sign-in-window-wrapper"}>
            <div className={"sign-up-sign-in-window"}>
                {registrationWindows.get(registrationWindowState)}
            </div>
        </div>
    )
}