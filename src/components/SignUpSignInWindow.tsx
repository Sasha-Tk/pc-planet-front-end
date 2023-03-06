import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {ReactComponent as EyeIcon} from "../images/svg/eye.svg";
import {ReactComponent as OffEyeIcon} from "../images/svg/eye-off.svg";
import disableScroll from 'disable-scroll'

enum RegistrationWindowState {
    signInState = "sign-in-window",
    signUpState = "sign-up-window",
    resetPasswordState = "reset-password-window"
}

export const SignUpSignInWindow = () => {


    const [registrationWindowState, setRegistrationWindowState] = useState(RegistrationWindowState.signInState)
    const {registrationWindowActive, setRegistrationWindowActive} = useContext(AppContext);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [agreeState, setAgreeState] = useState(false);


    useEffect(() => {
        const button = document.getElementById("sign-up-button") as HTMLButtonElement;
        if (button) {
            button.disabled = !agreeState;
        }
    }, [agreeState])
    useEffect(() => {
        Array.from(document.getElementsByClassName("register-window-input")).forEach((element) => {
            (element as HTMLInputElement).value = "";
        })
        setAgreeState(false)
    }, [registrationWindowState])
    useEffect(() => {
        registrationWindowActive ? disableScroll.on() : disableScroll.off();
        setPasswordVisibility(false);
        setAgreeState(false);
        setRegistrationWindowState(RegistrationWindowState.signInState);
    }, [registrationWindowActive])
    useEffect(() => {
        const inputs = Array.from(document.getElementsByClassName("password-visibility"));
        inputs.forEach((value) => {
            (value as HTMLInputElement).type = (value as HTMLInputElement).type === "password" ? "text" : "password";
        });

    }, [passwordVisibility])

    const registrationWindows = new Map<RegistrationWindowState, JSX.Element>();
    registrationWindows.set(RegistrationWindowState.signInState,
        <>
            <div className={"close-sign-in-window"} onClick={() => setRegistrationWindowActive(false)}>
                <span id={"close-button-first-line"}></span>
                <span id={"close-button-second-line"}></span>
            </div>
            <p className={"register-window-title"}>Log in</p>
            <form className={"register-form sign-in-form"} autoComplete={"off"}>
                <div className="email-input">
                    <input className={"register-window-input input"} id={"email-input"} type={"email"} placeholder={"Email"}/>
                </div>
                <div className="password-input">
                    <input className={"register-window-input input password-visibility"}
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
                Not a member?
                <span
                    className={"link-on-register-window"}
                    onClick={() => setRegistrationWindowState(RegistrationWindowState.signUpState)}
                >
                    Sign Up
                </span>
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
            <form className={"register-form sign-up-form"} autoComplete={"off"}>
                <div className="email-input">
                    <input className={"register-window-input input"} id={"email-input"} type={"email"} placeholder={"Email"}/>
                </div>
                <div className="user-name-input">
                    <input className={"register-window-input input"} id={"user-name-input"} type={"text"}
                           placeholder={"User name"}/>
                </div>
                <div className="password-input">
                    <input className={"register-window-input input password-visibility"}
                           id={"password-input"} type={"password"}
                           placeholder={"Password"}/>
                    <div className="eye-icon"
                         onClick={() => setPasswordVisibility(prevState => !prevState)}>
                        {passwordVisibility ? <EyeIcon/> : <OffEyeIcon/>}
                    </div>
                </div>
                <input className={"register-window-input input password-visibility"}
                       id={"password-confirmation-input"} type={"password"}
                       placeholder={"Confirm password"}/>
                <div className="registration-agreement">
                    <input className={"checkbox"} type={"checkbox"}
                           onChange={event => setAgreeState(event.target.checked)}/>
                    I agree to <span className={"link-on-register-window"}>Agree and Condition</span>
                </div>
                <button
                    className={"continue-registration-button"}
                    id={"sign-up-button"}
                    disabled={true}
                >Sign up
                </button>
            </form>
            <div className={"change-register-window"}>
                Already registered?
                <span
                    className={"link-on-register-window"}
                    onClick={() => setRegistrationWindowState(RegistrationWindowState.signInState)}
                >
                    Sign In
                </span>
            </div>
        </>)
    return (
        registrationWindowActive &&
        <div className={"sign-up-sign-in-window-wrapper"}>
            <div className={"register-window " + registrationWindowState}>
                {registrationWindows.get(registrationWindowState)}
            </div>
        </div>
    )
}