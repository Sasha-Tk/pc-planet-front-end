import {RegistrationWindowState} from "./SignUpSignInWindow";
import {ReactComponent as EyeIcon} from "../images/svg/eye.svg";
import {ReactComponent as OffEyeIcon} from "../images/svg/eye-off.svg";
import {default as Axios} from "axios";
import {useForm} from "react-hook-form";
import * as validation from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";

export const SignInWindow = (props: any) => {
    const {user, setUser} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        {
            errorExist: false,
            errorMessage: ""
        }
    );
    useEffect(() => {
        errorMessage.errorExist = false
    }, [props.registrationWindowActive]);

    const schema = validation.object().shape({
        email: validation.string().email("Not valid email!").required("Enter email!"),
        password: validation.string().required("Enter password!")
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
            "http://192.168.0.107:8080/api/v1/auth/sign-in",
            {
                "email": inputData.email,
                "password": inputData.password
            }
        ).then(
            response => {
                setUser({id: response.data.id, username: response.data.username, token: response.data.jwtToken})
                props.setRegistrationWindowActive(false)
            }
        ).catch(reason => {
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
        <div className={"register-window " + props.registrationWindowState}>
            <div className={"close-sign-in-window"} onClick={() => props.setRegistrationWindowActive(false)}>
                <span id={"close-button-first-line"}></span>
                <span id={"close-button-second-line"}></span>
            </div>
            <p className={"register-window-title"}>Log in</p>
            <form
                className={"register-form sign-in-form"}
                autoComplete={"off"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="email-input">
                    <input className={"register-window-input input"}
                           id={"email-input"} type={"email"} placeholder={"Email"}
                           {...register("email")}
                    />
                </div>

                <p className="error-message">{errors.email?.message?.toString()}</p>
                <div className="password-input">
                    <input className={"register-window-input input password-visibility"}
                           id={"password-input"} type={"password"} placeholder={"Password"}
                           {...register("password")}
                    />
                    <div className="eye-icon"
                         onClick={() => props.setPasswordVisibility((prevState: boolean) => !prevState)}>
                        {props.passwordVisibility ? <EyeIcon/> : <OffEyeIcon/>}
                    </div>
                </div>
                <div className={"password-errors"}>
                    <p className="error-message">{errors.password?.message?.toString()}</p>
                    <p className={"forgot-password-link"}>Forgot your password?</p>
                </div>

                <div className={`authentication-error-message-wrapper ${errorMessage.errorExist ? "with-error" : ""}`}>
                    <p className={"error-message"}>
                        {errorMessage.errorMessage}
                    </p>
                </div>

                <button
                    // value={"Log in"}
                    type={"submit"}
                    className={"continue-registration-button"}
                >{isLoading ? "Loading..." : "Log in"}</button>
            </form>
            <div className={"change-register-window"}>
                Not a member?
                <span
                    className={"link-on-register-window"}
                    onClick={() => props.setRegistrationWindowState(RegistrationWindowState.signUpState)}
                >Sign Up</span>
            </div>
        </div>
    )
}