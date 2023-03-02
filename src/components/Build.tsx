import {PopupMenu} from "./PopupMenu";

import React, {useState} from "react";

export enum ModalWindowState {
    globalState,
    languageState,
    themeState
}

export const Build = () => {
    const [modalWindowState, setModalWindowState] = useState(ModalWindowState.globalState);


    return (<div className={"content"}>
        {/*<div className={'test-nav-links'}>*/}
        {/*    <div className="popup-menu">*/}
        {/*        <button className="popup-button" id="popup-button-id">first link</button>*/}
        {/*        <PopupMenu*/}
        {/*            openButtonComponentID={"popup-button-id"}*/}
        {/*            visibleClass={"popup-menu-visible"}*/}
        {/*            contentClass={"popup-menu-content"}*/}
        {/*        >*/}
        {/*        </PopupMenu>*/}
        {/*    </div>*/}
        {/*    <div className="">*/}
        {/*        <div className="popup-menu">*/}
        {/*            <button className="popup-button" id="popup-button-id-2">second link</button>*/}
        {/*            <PopupMenu*/}
        {/*                openButtonComponentID={"popup-button-id-2"}*/}
        {/*                visibleClass={"popup-menu-visible"}*/}
        {/*                contentClass={"popup-menu-content"}*/}
        {/*            >*/}
        {/*                s[dkfnmslkdf*/}
        {/*            </PopupMenu>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>)
}