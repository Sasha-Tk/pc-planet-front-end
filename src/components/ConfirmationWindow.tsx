import {Fragment, useEffect} from "react";
import disableScroll from "disable-scroll";
import {useTranslation} from "./Language";

export const ConfirmationWindow = (props: any) => {
    const {translate} = useTranslation()
    useEffect(() => {
        props.visibility ? disableScroll.on() : disableScroll.off();
    }, [props.visibility]);

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
                    <div>
                        {translate(props.message)}
                        <span className="message-action"><Fragment> </Fragment>{translate(props.action)}?</span>
                    </div>
                </div>

                <div className="confirmation-buttons">
                    <button
                        className="confirmation-button"
                        onClick={() => {
                            props.confirmationFunction()
                            props.setVisibility(false)
                        }}
                    >
                        {translate("Yes")}
                    </button>
                    <button
                        className="confirmation-button"
                        onClick={() => {
                            props.rejectionFunction()
                            props.setVisibility(false)
                        }}
                    >
                        {translate("No")}
                    </button>
                </div>
            </div>
        </div>
    )
}