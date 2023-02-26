import {useState} from "react";

export const PopupMenu = (props: any) => {

    const [popupState, setPopupState] = useState(true);

    return (
        <div className={popupState ? `${props.contentClass} ${props.visibleClass}` : `${props.contentClass}`}>
            {props.children}
        </div>
    )
}