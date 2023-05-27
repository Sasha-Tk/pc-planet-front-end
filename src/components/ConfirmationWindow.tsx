import {Fragment, useEffect} from "react";
import disableScroll from "disable-scroll";

export const ConfirmationWindow = (props: any) => {

    useEffect(() => {
        props.visibility ? disableScroll.on() : disableScroll.off();
    }, [props.visibility]);

    // const message = "Are you sure you want to"
    // const action = "logout"

    return (
        <div className={"confirmation-wrapper " + (props.visibility ? "visible" : "")}>
            <div className={"confirmation-content"}>
                <div className={"close-confirmation"}>
                    <div className="close-confirmation-button" onClick={() => props.setVisibility(false)}>
                        <span id={"close-button-first-line"}></span>
                        <span id={"close-button-second-line"}></span>
                    </div>
                </div>
                <div className="confirmation-message">
                    {props.message}
                    <span className="message-action"><Fragment> </Fragment>{props.action}?</span>
                </div>
                <div className="confirmation-buttons">
                    <button
                        className="confirmation-button"
                        onClick={() => {
                            props.confirmationFunction()
                            props.setVisibility(false)
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="confirmation-button"
                        onClick={() => {
                            props.rejectionFunction()
                            props.setVisibility(false)
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}