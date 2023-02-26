import {PopupMenu} from "./PopupMenu";

export const Build = () => {
    return (<div className={"content"}>
        <div className={'test-nav-links'}>
            <div className="popup-menu">
                <div className="popup-button" id="popup-button-id">first link</div>
                <PopupMenu
                    openButtonComponentID={"popup-button-id"}
                    visibleClass={"popup-menu-visible"}
                    contentClass={"popup-menu-content"}
                >
                    Content...
                </PopupMenu>
            </div>
            <div className="">second link</div>
        </div>
    </div>)
}