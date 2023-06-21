import {ReactComponent as EyeIcon} from "../images/svg/eye.svg";
import {ReactComponent as OffEyeIcon} from "../images/svg/eye-off.svg";
import {useContext, useEffect, useState} from "react";
import {RegistrationWindowState} from "./SignUpSignInWindow";
import * as validation from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {default as Axios} from "axios";
import {AppContext} from "../App";
import {useTranslation} from "./Language";

export const SignUpWindow = (props: any) => {
    const {user, setUser} = useContext(AppContext);
    const [agreeState, setAgreeState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {translate} = useTranslation()
    useEffect(() => {
        const button = document.getElementById("sign-up-button") as HTMLButtonElement;
        if (button) {
            button.disabled = !agreeState;
        }
    }, [agreeState])
    useEffect(() => {
        props.setPasswordVisibility(false);
        setAgreeState(false);
        errorMessage.errorExist = false;
    }, [props.registrationWindowState]);

    useEffect(() => {
        errorMessage.errorExist = false
    }, [props.registrationWindowActive]);


    const [errorMessage, setErrorMessage] = useState(
        {
            errorExist: false,
            errorMessage: ""
        }
    );

    const schema = validation.object().shape({
        email: validation.string().email("Not valid email!").required("Enter email!"),
        username: validation.string()
            .min(2, "At least 2 symbols required")
            .max(18, "Username is too long")
            .required("Enter username"),
        password: validation.string().required("Enter password!"),
        passwordConfirmation: validation
            .string()
            .oneOf([validation.ref("password")], "Passwords aren't same")
            .required("Enter password confirmation")
    })

    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = (inputData: any) => {
        setErrorMessage({...errorMessage, errorExist: false})
        setIsLoading(true)
        Axios.post(
            "http://192.168.0.107:8080/api/v1/auth/sign-up",
            {
                "email": inputData.email,
                "username": inputData.username,
                "password": inputData.password
            }
        ).then(response => {
            setUser({id: response.data.id, username: response.data.username, token: response.data.jwtToken})
            props.setRegistrationWindowActive(false)
        }).catch(reason => {
            if (reason.response) {
                setErrorMessage(
                    {
                        errorExist: true,
                        errorMessage: reason.response.data.details
                    }
                )
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }
    return (
        <div className={"register-window sign-up-window"}>
            <div className={"close-sign-in-window"} onClick={() => props.setRegistrationWindowActive(false)}>
                <span id={"close-button-first-line"}></span>
                <span id={"close-button-second-line"}></span>
            </div>
            <p className={"register-window-title"}>{translate("Sign up")}</p>
            <form
                className={"register-form sign-up-form"}
                autoComplete={"off"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="email-input">
                    <input
                        className={"register-window-input input"}
                        id={"email-input"}
                        type={"email"}
                        placeholder={translate("Email")}
                        {...register("email")}
                    />
                </div>
                <p className="error-message">{errors.email?.message?.toString()}</p>
                <div className="user-name-input">
                    <input
                        className={"register-window-input input"}
                        id={"user-name-input"}
                        type={"text"}
                        placeholder={translate("User name")}
                        {...register("username")}
                    />
                </div>
                <p className="error-message">{errors.username?.message?.toString()}</p>
                <div className="password-input">
                    <input
                        className={"register-window-input input password-visibility"}
                        id={"password-input"}
                        type={"password"}
                        placeholder={translate("Password")}
                        {...register("password")}
                    />
                    <div className="eye-icon"
                         onClick={() => props.setPasswordVisibility((prevState: boolean) => !prevState)}>
                        {props.passwordVisibility ? <EyeIcon/> : <OffEyeIcon/>}
                    </div>
                </div>
                <p className="error-message">{errors.password?.message?.toString()}</p>
                <input
                    className={"register-window-input input password-visibility"}
                    id={"password-confirmation-input"}
                    type={"password"}
                    placeholder={translate("Confirm password")}
                    {...register("passwordConfirmation")}
                />
                <p className="error-message">{errors.passwordConfirmation?.message?.toString()}</p>
                <div className="registration-agreement">
                    <input className={"checkbox"} type={"checkbox"}
                           onChange={event => setAgreeState(event.target.checked)}
                           checked={agreeState}
                    />
                    {translate("I agree to")}
                    <span className={"link-on-register-window"}>{translate("Agree and Condition")}</span>
                </div>
                <div className={`authentication-error-message-wrapper ${errorMessage.errorExist ? "with-error" : ""}`}>
                    <p className={"error-message"}>
                        {errorMessage.errorMessage}
                    </p>
                </div>
                <button

                    className={"continue-registration-button"}
                    id={"sign-up-button"}
                    disabled={!agreeState}
                    type={"submit"}
                >{translate(isLoading ? "Loading..." : "Sign up")}</button>
            </form>
            <div className={"change-register-window"}>
                {translate("Already registered?")}
                <span
                    className={"link-on-register-window"}
                    onClick={() => props.setRegistrationWindowState(RegistrationWindowState.signInState)}
                >
                    {translate("Sign In")}
                </span>
            </div>
        </div>
    )
}