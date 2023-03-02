import {useEffect, useRef, useState} from "react";

export const PopupMenu = (props: any) => {
    const [popupState, setPopupState] = useState(false);
    const popupRef = useRef<any>(null)

    useEffect(() => {
        const button = document.getElementById(props.openButtonComponentID);
        if (popupState) {
            button?.classList.add("popup-button-active");
        } else {
            button?.classList.remove("popup-button-active");
            setTimeout(() => props.setDefaultWindow(props.defaultWindow), 300);
        }
    }, [popupState])

    useEffect(() => {
        const button = document.getElementById(props.openButtonComponentID);
        if (button) {
            button.onclick = (ev) => {
                button.classList.toggle("popup-button-active");
                setPopupState(!popupState);
            }
        }
        const handleClickOutside = (event: Event) => {
            console.log(popupRef.current);
            console.log(event.target as Node);
            console.log((!popupRef.current.contains(event.target as Node)));
            if ((!popupRef.current?.contains(event.target as Node) && event.target !== button)
                || Array.from(document.getElementsByClassName(props.closeElementClass))
                    .some(el => el.contains(event.target as Node))) {
                setPopupState(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    })

    return (
        <div
            ref={popupRef}
            className={popupState ? `${props.contentClass} ${props.visibleClass}` : `${props.contentClass}`}>
            {props.children}
        </div>
    )
}