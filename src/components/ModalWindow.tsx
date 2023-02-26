import {useEffect} from "react";

export const ModalWindow = (props: any) => {
    useEffect(() => {
        const listener = (event: any) => {
            for (const element of event.composedPath()) {
                if (element.classList?.contains(props.notClosingElementsClass)) {
                    return;
                }
            }
            props.setVisibility(false);
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener);
        }
    }, [])

    return (
        <div style={{width: props.width}}
             className={props.isVisible ? "modal-window modal-window-visible" : "modal-window"}>
            {props.children}
        </div>
    )
}